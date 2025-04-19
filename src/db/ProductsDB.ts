import {
  GetAllProductsQueryParams,
  Product,
  UpdateProductsRequestBody,
} from '@/api/products/products.types';
import CONSTANTS from '@/shared/types/constants';

const { PRODUCTS_DB_NAME, PRODUCTS_DB_VERSION, PRODUCTS_STORE_NAME } =
  CONSTANTS.INDEX_DB;

const deleteDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(PRODUCTS_DB_NAME);
    request.onsuccess = () => {
      console.log('Database deleted successfully');
      resolve();
    };
    request.onerror = () => {
      console.error('Error deleting database:', request.error);
      reject(request.error);
    };
    request.onblocked = () => {
      console.warn('Delete blocked. Please close other tabs.');
    };
  });
};

const openDB = async (): Promise<IDBDatabase> => {
  await deleteDB(); // for create objectStore

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PRODUCTS_DB_NAME, PRODUCTS_DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(PRODUCTS_STORE_NAME)) {
        db.createObjectStore(PRODUCTS_STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(`IndexedDB error: ${request.error}`);
    };
  });
};

const saveProducts = async (products: Product[]): Promise<void> => {
  const db = await openDB();
  console.log(db);
  const transaction = db.transaction(PRODUCTS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(PRODUCTS_STORE_NAME);

  products.forEach((product) => {
    store.put(product);
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(`Transaction error: ${transaction.error}`);
    };
  });
};

const getAllProducts = async (
  options: GetAllProductsQueryParams,
): Promise<{
  data: Product[];
  meta: { page: number; pageSize: number; total: number };
}> => {
  const {
    page,
    pageSize,
    search,
    minPrice = '0',
    maxPrice = '0',
    startDate,
    endDate,
    category,
    sortOrder,
    sortBy,
  } = options;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PRODUCTS_DB_NAME);

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(PRODUCTS_STORE_NAME, 'readonly');
      const store = transaction.objectStore(PRODUCTS_STORE_NAME);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        let filtered = getAllRequest.result as Product[];

        // search
        if (search) {
          filtered = filtered.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase()),
          );
        }

        // price range
        if (minPrice !== '0' && maxPrice !== '0') {
          filtered = filtered.filter(
            (p) =>
              p.price >= parseFloat(minPrice) &&
              p.price <= parseFloat(maxPrice),
          );
        }

        // category
        if (category) {
          filtered = filtered.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase(),
          );
        }

        // date range
        if (startDate) {
          filtered = filtered.filter(
            (p) => new Date(p.date) >= new Date(startDate),
          );
        }

        if (endDate) {
          filtered = filtered.filter(
            (p) => new Date(p.date) <= new Date(endDate),
          );
        }

        // sort
        if (sortBy) {
          filtered.sort((a, b) => {
            const aVal = a[sortBy as keyof Product];
            const bVal = b[sortBy as keyof Product];

            if (aVal < bVal) return sortOrder === 'desc' ? 1 : -1;
            if (aVal > bVal) return sortOrder === 'desc' ? -1 : 1;
            return 0;
          });
        }

        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginated = filtered.slice(start, end);

        resolve({
          data: paginated,
          meta: {
            page,
            pageSize,
            total,
          },
        });
      };

      getAllRequest.onerror = (e: Event) => {
        reject(e);
      };
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
};

const getProductById = async (id: number): Promise<Product | null> => {
  const db = await openDB();
  const transaction = db.transaction(PRODUCTS_STORE_NAME, 'readonly');
  const store = transaction.objectStore(PRODUCTS_STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result ?? null);
    };

    request.onerror = () => {
      reject(`Failed to retrieve product with id ${id}: ${request.error}`);
    };
  });
};

const updateProductById = async (
  id: number,
  data: UpdateProductsRequestBody,
): Promise<Product | null> => {
  const db = await openDB();
  const transaction = db.transaction(PRODUCTS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(PRODUCTS_STORE_NAME);

  return new Promise((resolve, reject) => {
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const existingProduct = getRequest.result as Product | undefined;

      if (!existingProduct) {
        return resolve(null);
      }

      const updatedProduct: Product = {
        ...existingProduct,
        ...data,
        date: new Date().toISOString(),
      };

      const updateRequest = store.put(updatedProduct);

      updateRequest.onsuccess = () => {
        resolve(updatedProduct);
      };

      updateRequest.onerror = () => {
        reject(`Failed to update product: ${updateRequest.error}`);
      };
    };

    getRequest.onerror = () => {
      reject(`Failed to find product with id ${id}: ${getRequest.error}`);
    };
  });
};

const deleteProductById = async (id: number): Promise<boolean> => {
  const db = await openDB();
  const transaction = db.transaction(PRODUCTS_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(PRODUCTS_STORE_NAME);

  const deleteRequest = store.delete(id);

  return new Promise((resolve) => {
    deleteRequest.onsuccess = () => {
      resolve(true);
    };

    deleteRequest.onerror = () => {
      resolve(false);
    };
  });
};

export {
  saveProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};

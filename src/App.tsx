import {
  GetAllProductsQueryParams,
  GetAllProductsResponse,
  Product,
} from './api/products/products.types';
import { fetchGetAllProducts } from './api/products/products';
import { useState, useEffect, useCallback } from 'react';
import Table from './components/Table/Table';
import styles from './index.module.scss';
import { convertDate } from './shared/utils/dateUtils';
import priceSeparator from './shared/utils/priceUtils';
import IconButton from './components/IconButton/IconButton';
import { AccentColors, Variant } from './shared/types/enums';
import {
  InformationIcon,
  PlusIcon,
  TrashIcon,
  UpdateIcon,
} from './assets/icons';
import Modal from './components/Modal/Modal';
import { Column, Row } from './components/Table/Table.types';
import Typography from './components/Typography/Typography';
import ProductsFilters from './filters/ProductsFilters/ProductsFilters';
import { ProductFilterItems } from './filters/ProductsFilters/ProductsFilters.types';
import { ActionButton, Sort } from './shared/types/types';
import CreateNewProduct from './forms/CreateNewProduct/CreateNewProduct';
import UpdateProduct from './forms/UpdateProduct/UpdateProduct';
import DeleteProduct from './forms/DeleteProduct/DeleteProduct';
import { getAllProducts, getProductById, saveProducts } from './db/ProductsDB';

function App() {
  const [products, setProducts] = useState<GetAllProductsResponse>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productDescription, setProductDescription] = useState<string>('');
  const [productTitle, setProductTitle] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<ProductFilterItems>();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<Sort>();

  const fetchFromDB = useCallback(async () => {
    const options: GetAllProductsQueryParams = {
      page,
      pageSize,
      search: searchQuery,
      minPrice: appliedFilters?.minPrice,
      maxPrice: appliedFilters?.maxPrice,
      startDate: appliedFilters?.startDate,
      endDate: appliedFilters?.endDate,
      category: appliedFilters?.category,
      sortBy: sort?.sortBy,
      sortOrder: sort?.sortOrder,
    };

    try {
      const dbResult = await getAllProducts(options);
      setProducts(dbResult);
    } catch (error) {
      console.error('Failed to fetch from IndexedDB:', error);
    }
  }, [page, pageSize, searchQuery, appliedFilters, sort]);

  const getAllProductsRequest = async () => {
    const { data, error } = await fetchGetAllProducts();

    if (!data || error) return;

    try {
      await saveProducts(data.data);
    } catch (err) {
      console.error('Failed to save to IndexedDB:', err);
    }

    await fetchFromDB();
  };

  useEffect(() => {
    getAllProductsRequest();
  }, []);

  useEffect(() => {
    fetchFromDB();
  }, [fetchFromDB]);

  const column: Column[] = [
    {
      label: 'id',
      size: '8%',
      sortable: true,
    },
    {
      label: 'title',
      size: '30%',
      sortable: true,
    },
    {
      label: 'category',
      size: '12%',
      sortable: true,
    },
    {
      label: 'price',
      size: '10%',
      sortable: true,
    },
    {
      label: 'stock',
      size: '10%',
      sortable: true,
    },
    {
      label: 'rating',
      size: '10%',
      sortable: true,
    },
    {
      label: 'date',
      size: '10%',
      sortable: true,
    },
    {
      label: 'actions',
      size: '10%',
    },
  ];

  const rows: Row[] = products
    ? products?.data.map((item) => ({
        id: item.id,
        cells: [
          {
            value: item.id,
          },
          {
            value: item.title,
          },
          {
            value: item.category,
          },
          {
            value: priceSeparator(item.price) + '$',
          },
          {
            value: item.stock,
          },
          {
            value: item.rating,
          },
          {
            value: convertDate(item.date),
          },
          {
            value: (
              <>
                <IconButton
                  icon={<InformationIcon />}
                  color={AccentColors.Secondary}
                  onClick={() =>
                    handleDisplayDescription(item.title, item.description)
                  }
                  title={'more information'}
                />
                <IconButton
                  icon={<UpdateIcon />}
                  color={AccentColors.Secondary}
                  onClick={() => handleDisplayUpdateProductForm(item.id)}
                  title={`update ${item.title}`}
                />
                <IconButton
                  icon={<TrashIcon />}
                  color={AccentColors.Secondary}
                  onClick={() => {
                    setProduct(item);
                    setIsDeleteModalOpen(true);
                  }}
                  title={`delete ${item.title}`}
                />
              </>
            ),
          },
        ],
      }))
    : [];

  const handleDisplayDescription = (title: string, description: string) => {
    setProductTitle(title);
    setProductDescription(description);
    setIsOpen(true);
  };

  const handleDisplayUpdateProductForm = async (id: number) => {
    const dbResult = await getProductById(id);

    if (!dbResult) return;

    setProduct(dbResult);

    setIsUpdateModalOpen(true);
  };

  const tableControlAction: ActionButton = {
    icon: <PlusIcon />,
    label: 'add',
    onClick: () => setIsCreateModalOpen(true),
  };

  return (
    <div className={styles.container}>
      <Table
        columns={column}
        rows={rows}
        search={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: 'search in products',
        }}
        filter={{
          isOpen: isFilterModalOpen,
          onOpen: setIsFilterModalOpen,
          body: (
            <ProductsFilters
              onAppliedFilters={setAppliedFilters}
              appliedFilters={appliedFilters}
              submit={() => setIsFilterModalOpen(false)}
            />
          ),
        }}
        onSortChange={setSort}
        action={tableControlAction}
        pagination={{
          total: products?.meta.total || 0,
          onSelectedPageSize: setPageSize,
          onSelectedPage: setPage,
        }}
      />

      <Modal
        isOpen={isOpen}
        title={productTitle}
        body={<Typography variant={Variant.P} text={productDescription} />}
        onClose={() => setIsOpen(false)}
      />

      <Modal
        isOpen={isCreateModalOpen}
        title={'Create new product'}
        body={
          <CreateNewProduct
            submit={() => {
              fetchFromDB();
              setIsCreateModalOpen(false);
            }}
          />
        }
        onClose={() => setIsCreateModalOpen(false)}
      />

      {product && (
        <Modal
          isOpen={isUpdateModalOpen}
          title={`Update ${product.title}`}
          body={
            <UpdateProduct
              submit={() => {
                fetchFromDB();
                setIsUpdateModalOpen(false);
              }}
              product={product}
            />
          }
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}

      {product && (
        <Modal
          isOpen={isDeleteModalOpen}
          title={`Delete ${product.title}`}
          body={
            <DeleteProduct
              id={product.id}
              title={product.title}
              submit={() => {
                fetchFromDB();
                setIsDeleteModalOpen(false);
              }}
            />
          }
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

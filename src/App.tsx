import { GetAllProductsResponse, Product } from './api/products/products.types';
import {
  fetchGetAllProducts,
  fetchGetProductDetails,
} from './api/products/products';
import { useState, useCallback, useEffect } from 'react';
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
import { ActionButton } from './shared/types/types';
import CreateNewProduct from './forms/CreateNewProduct/CreateNewProduct';
import UpdateProduct from './forms/UpdateProduct/UpdateProduct';
import DeleteProduct from './forms/DeleteProduct/DeleteProduct';

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

  const getAllProducts = useCallback(async () => {
    const { data, error } = await fetchGetAllProducts({
      page: page,
      pageSize: pageSize,
      search: searchQuery,
      minPrice: appliedFilters?.minPrice,
      maxPrice: appliedFilters?.maxPrice,
      startDate: appliedFilters?.startDate,
      endDate: appliedFilters?.endDate,
      category: appliedFilters?.category,
    });

    if (!data || error) return;

    setProducts(data);
  }, [page, pageSize, searchQuery, appliedFilters]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const column: Column[] = [
    {
      label: 'title',
      size: '30%',
    },
    {
      label: 'category',
      size: '14%',
    },
    {
      label: 'price',
      size: '10%',
    },
    {
      label: 'stock',
      size: '12%',
    },
    {
      label: 'rating',
      size: '12%',
    },
    {
      label: 'date',
      size: '12%',
    },
    {
      label: 'actions',
      size: '10%',
    },
  ];

  const rows: Row[] = products
    ? products.data.map((item) => ({
        id: item.id,
        cells: [
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
    const { data, error } = await fetchGetProductDetails(id);

    if (!data || error) return;

    setProduct(data.data);

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
              getAllProducts();
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
                getAllProducts();
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
                getAllProducts();
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

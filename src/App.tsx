import { useState, useEffect } from 'react';
import { Product } from './api/products/products.types';
import { fetchGetAllProducts } from './api/products/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data, error } = await fetchGetAllProducts({
        page: 1,
        pageSize: 10,
      });

      if (!data || error) return;

      setProducts(data.data);
    };

    getAllProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

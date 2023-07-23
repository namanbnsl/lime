import { useEffect, useState } from 'react';
import * as lime from '@lime-npm/js-sdk';
import { Product } from '@lime-npm/js-sdk/build/types/product';
import { Category } from '@lime-npm/js-sdk/build/types/category';

function App() {
  const [data, setData] = useState<Product[]>();
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      const STORE_ID = 'clkebeeab0006pk14qxsi6708'; // This wont work. Please use your own STORE_ID here.;

      const data = await lime.getAllProducts(STORE_ID);
      const categories = await lime.getAllCategories(STORE_ID);

      setData(data);
      setAllCategories(categories);
    };

    getData();
  }, []);

  return (
    <>
      <h3>Data returned: </h3>
      <code>{JSON.stringify(data)}</code>

      <h3>All Categories</h3>
      <code>{JSON.stringify(allCategories)}</code>

      <div>
        {data?.map((product) => (
          <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <img src={product.imageUrl} width={200} height={200} />
            <p>
              Categories:{' '}
              {product.category.map((category) => (
                <span style={{ marginRight: 3 }}>{category.name},</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

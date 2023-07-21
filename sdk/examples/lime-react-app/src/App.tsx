import { useEffect, useState } from 'react';
import * as lime from '@lime-npm/js-sdk';
import { Product } from '@lime-npm/js-sdk/build/types/product';

function App() {
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await lime.getAllProducts('clk9mvms30006pkq8dennrvsm');
      setData(data);
    };

    getData();
  });

  return (
    <>
      <h3>Data returned: </h3>
      <code>{JSON.stringify(data)}</code>

      <div>
        {data?.map((product) => (
          <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <img src={product.imageUrl} width={200} height={200} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

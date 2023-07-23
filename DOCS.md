# SDK

### Get All Products

```js
import * as lime from '@lime-npm/js-sdk';

const STORE_ID = 'some_value'; // this is required. if not put this will throw error

const products = await lime.getAllProducts(STORE_ID); // [] - returns array of all products in store
```

### Get All Categories

```js
import * as lime from '@lime-npm/js-sdk';

const STORE_ID = 'some_value'; // this is required. if not put this will throw error

const categories = await lime.getAllCategories(STORE_ID); // [] - returns array of all categories in store
```

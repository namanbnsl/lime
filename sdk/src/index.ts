import { LimeSDK } from './lime.js';

const client = new LimeSDK();

const getAllProducts = client.getProducts.bind(client);
const getAllCategories = client.getCategories.bind(client);

export { getAllProducts, getAllCategories };

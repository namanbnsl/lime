import { LimeSDK } from './lime.js';

const client = new LimeSDK();

const getAllProducts = client.getProducts.bind(client);

export { getAllProducts };

import { LimeSDK } from './lime.js';
var client = new LimeSDK();
var getAllProducts = client.getProducts.bind(client);
export { getAllProducts };

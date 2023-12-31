import { Category } from './types/category.js';
import { LimeSDKType } from './types/lime-type.js';
import { Product } from './types/product.js';
import { HOST } from './utils/host.js';

export class LimeSDK implements LimeSDKType {
  async getProducts(storeId: string): Promise<Product[]> {
    if (storeId.length <= 0) throw new Error('No storeId has been passed');

    const data = await fetch(
      HOST + '/api/public/products/getAllProducts?storeId=' + storeId
    );

    const products = await data.json();

    return products.data;
  }

  async getCategories(storeId: string): Promise<Category[]> {
    if (storeId.length <= 0) throw new Error('No storeId has been passed');

    const data = await fetch(
      HOST + '/api/public/categories/getAllCategories?storeId=' + storeId
    );

    const products = await data.json();

    return products.data;
  }
}

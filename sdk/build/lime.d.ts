import { LimeSDKType } from './types/lime-type.js';
import { Product } from './types/product.js';
export declare class LimeSDK implements LimeSDKType {
  getProducts(storeId: string): Promise<Product[]>;
}

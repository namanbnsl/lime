import { Product } from './product';

export interface LimeSDKType {
  getProducts(storeId: string): Promise<Product[]>;
}

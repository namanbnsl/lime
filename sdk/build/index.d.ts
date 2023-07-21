declare const getAllProducts: (
  storeId: string
) => Promise<import('./types/product.js').Product[]>;
export { getAllProducts };

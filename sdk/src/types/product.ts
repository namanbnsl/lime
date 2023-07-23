import { Category } from './category';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category[];
}

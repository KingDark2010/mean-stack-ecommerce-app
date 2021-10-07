// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Category } from "@ntig9/products";


export interface Product {
  _id: string;
  name: string;
  descriptionLite: string;
  description: string;
  price: number;
  image: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  category: Category;
  brand: string;
  seller: ProductSeller;
  countInStock: number;
  isFeatured?: boolean;
  haveDiscount?: boolean;
  discount?: number;
  rating?: number;
  tags?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface ProductObject {
  data: Product;
}


export interface ProductsObject {
  data: Product[];
}

export interface ProductSeller {
  firstName: string;
}

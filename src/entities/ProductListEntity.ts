import { ProductEntity } from "./ProductEntity";

export type ProductListEntity = {
  products: ProductEntity[];
  total: number;
  skip: number;
  limit: number;
};

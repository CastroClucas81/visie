export type CreateProductDto = {
  title?: string;
  description?: string;
  price?: number;
  discountPercent?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

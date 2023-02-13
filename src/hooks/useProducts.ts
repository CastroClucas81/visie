import { useState } from "react";
import { ProductEntity } from "../entities/ProductEntity";
import { productService } from "../services/productService";

const useProducts = (pageLimit: number) => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const virtualPage =
        (page - 1) * pageLimit <= 0 ? 0 : (page - 1) * pageLimit;

      const result = await productService.findAllPaginate(
        virtualPage,
        pageLimit
      );

      setProducts(result.products);
      setTotalPages(Math.round(result.total / result.limit));
    } catch (error) {
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleFetchProducts,
    products,
    totalPages,
    isTableLoading: loading,
  };
};

export default useProducts;

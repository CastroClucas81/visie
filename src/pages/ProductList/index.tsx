import { useCallback, useEffect } from "react";
import { Container, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import CustomSpinnerLoading from "../../components/CustomLoadingSpinner";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import { CustomError } from "../../handler/CustomError";
import usePagination from "../../hooks/usePagination";
import useProducts from "../../hooks/useProducts";
import { productService } from "../../services/productService";
import { strings } from "../../utils/strings";

const ProductList = () => {
  const navigate = useNavigate();
  const { products, handleFetchProducts, totalPages, isTableLoading } =
    useProducts(20);
  const { actualPage, setActualPage } = usePagination();

  const handleDelete = useCallback(async (id: number) => {
    try {
      Swal.fire({
        title: strings.areYouSureDelete,
        text: strings.youWontAbleRevertThis,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#dc3545",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await productService.delete(id);

          Swal.fire({
            text: strings.hasBeenDeleted,
            icon: "success",
            confirmButtonColor: "#198754",
          });
        }
      });
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError.message);
    }
  }, []);

  useEffect(() => {
    handleFetchProducts(actualPage);
  }, [actualPage]);

  return (
    <Container>
      <PageTitle title="Product List" />
      <Table responsive className="text-white customTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>D. Percentage</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isTableLoading &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>
                  {product.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{product.discountPercentage}%</td>
                <td>{product.rating}</td>
                <td>{product.stock}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td width="165">
                  <TableButtons
                    deleteAction={() => handleDelete(product.id)}
                    editAction={() => navigate(`/edit-product/${product.id}`)}
                    infoAction={() => navigate(`/product-detail/${product.id}`)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {isTableLoading && <CustomSpinnerLoading />}
      {!isTableLoading && products.length === 0 && (
        <p className="text-center">Empty list</p>
      )}

      {products.length > 0 && (
        <Pagination size="lg" className="d-flex justify-content-end">
          <Pagination.First
            onClick={() => setActualPage(1)}
            disabled={actualPage === 1}
          />
          {Array(totalPages)
            .fill("")
            .map((_, index) => {
              return (
                <Pagination.Item
                  key={index}
                  onClick={() => setActualPage(index + 1)}
                  disabled={index === actualPage - 1}
                >
                  {index + 1}
                </Pagination.Item>
              );
            })}
          <Pagination.Last
            onClick={() => setActualPage(totalPages)}
            disabled={actualPage === totalPages}
          />
        </Pagination>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ProductList;

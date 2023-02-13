import { useCallback, useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import CustomListGroupImageItem from "../../components/CustomListGroupImageItem";
import CustomListGroupItem from "../../components/CustomListGroupItem";
import CustomSpinnerLoading from "../../components/CustomLoadingSpinner";
import PageTitle from "../../components/PageTitle";
import { ProductEntity } from "../../entities/ProductEntity";
import { CustomError } from "../../handler/CustomError";
import { productService } from "../../services/productService";
import { strings } from "../../utils/strings";

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductEntity>();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFetchInitial = useCallback(async () => {
    try {
      const result = await productService.findById(parseInt(id!));
      setProduct(result);
      setLoading(false);
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
    }
  }, [loading, product]);

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
    handleFetchInitial();
  }, []);

  return (
    <Container>
      {loading && !product ? (
        <CustomSpinnerLoading />
      ) : (
        <>
          <PageTitle title={`${product?.title} Details`} />
          <ListGroup className="mb-3">
            <CustomListGroupItem title="Title" description={product?.title} />
            <CustomListGroupItem
              title="Description"
              description={product?.description}
            />
            <CustomListGroupItem
              title="Price"
              description={product?.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            />
            <CustomListGroupItem
              title="Discount Percentage"
              description={`${product?.discountPercentage.toString()}%`}
            />
            <CustomListGroupItem
              title="Rating"
              description={product?.rating.toString()}
            />
            <CustomListGroupItem
              title="Stock"
              description={product?.stock.toString()}
            />
            <CustomListGroupItem title="Brand" description={product?.brand} />
            <CustomListGroupItem
              title="Category"
              description={product?.category}
            />

            <CustomListGroupImageItem
              title="Thumbnail"
              image={product?.thumbnail}
            />

            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              {product?.images.map((image, index) => (
                <CustomListGroupImageItem
                  key={index}
                  title={`Image - ${index + 1}`}
                  image={image}
                />
              ))}
            </ListGroup.Item>
          </ListGroup>

          <div className="d-flex justify-content-end">
            <Button
              onClick={() => navigate(`/edit-product/${product?.id}`)}
              variant="primary"
              type="submit"
              style={{ marginRight: 10 }}
            >
              <AiFillEdit />
              Edit {product?.title}
            </Button>
            <Button
              variant="danger"
              type="submit"
              onClick={() => handleDelete(product?.id!)}
            >
              <AiFillDelete />
              Delete {product?.title}
            </Button>
          </div>
        </>
      )}

      <ToastContainer />
    </Container>
  );
};

export default ProductDetail;

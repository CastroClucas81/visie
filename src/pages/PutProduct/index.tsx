import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import CustomSpinnerLoading from "../../components/CustomLoadingSpinner";
import FormProduct from "../../components/FormProduct";
import PageTitle from "../../components/PageTitle";
import { UpdateProductDto } from "../../dtos/updateProductDto";
import { CustomError } from "../../handler/CustomError";
import { productService } from "../../services/productService";
import { FormProductValues } from "../../types/FormProductValues";
import { strings } from "../../utils/strings";

const PutProduct = () => {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<FormProductValues>();
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePut = async (formValues: FormProductValues) => {
    try {
      const dto: UpdateProductDto = {
        title: formValues.title,
        description: formValues.title,
        price: formValues.price,
        discountPercentage: formValues.discountPercentage,
        brand: formValues.brand,
        category: formValues.category,
        images: formValues.images,
        rating: formValues.rating,
        stock: formValues.stock,
        thumbnail: formValues.thumbnail,
      };

      await productService.update(formValues.id!, dto);

      Swal.fire({
        title: strings.productUpdated,
        icon: "success",
        confirmButtonColor: "#F71E2E",
      });
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError.message);
    }
  };

  const handleFetchInitial = useCallback(async () => {
    try {
      const product = await productService.findById(parseInt(id!));
      setInitialValues({ ...product });
      setLoading(false);
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
    }
  }, [loading, initialValues]);

  useEffect(() => {
    handleFetchInitial();
  }, []);

  return (
    <Container>
      {loading && !initialValues ? (
        <CustomSpinnerLoading />
      ) : (
        <>
          <PageTitle title={`Edit ${initialValues?.title} Product`} />
          <FormProduct
            initialValues={initialValues!}
            formFunction={(formValues) => handlePut(formValues)}
            textButton={strings.submitEdit}
          />
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default PutProduct;

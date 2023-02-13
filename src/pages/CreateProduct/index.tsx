import Container from "react-bootstrap/esm/Container";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import FormProduct from "../../components/FormProduct";
import PageTitle from "../../components/PageTitle";
import { CreateProductDto } from "../../dtos/createProductDto";
import { CustomError } from "../../handler/CustomError";
import { productService } from "../../services/productService";
import { FormProductValues } from "../../types/FormProductValues";
import { strings } from "../../utils/strings";

const initialValues: FormProductValues = {
  title: "",
  description: "",
  price: 0.0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [""],
};

const CreateProduct = () => {
  const handleCreate = async (formValues: FormProductValues) => {
    try {
      const dto: CreateProductDto = { ...formValues };

      await productService.create(dto);

      Swal.fire({
        title: strings.productCreated,
        icon: "success",
        confirmButtonColor: "#F71E2E",
      });
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError.message);
    }
  };

  return (
    <Container>
      <PageTitle title="Create a new Product" />
      <FormProduct
        initialValues={initialValues}
        formFunction={(formValues) => handleCreate(formValues)}
        textButton="Create Product"
        isCreate
      />
      <ToastContainer />
    </Container>
  );
};

export default CreateProduct;

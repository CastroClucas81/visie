import { Form, Formik, FormikHelpers } from "formik";
import { useCallback, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { formProductValidationSchema } from "../../schemas/formProductValidationSchema";
import { FormProductValues } from "../../types/FormProductValues";
import CustomInput from "../CustomInput";

type FormProductType = {
  initialValues: FormProductValues;
  textButton: string;
  formFunction: (formValues: FormProductValues) => Promise<void>;
  isCreate?: boolean;
};

const FormProduct = ({
  initialValues,
  textButton,
  formFunction,
  isCreate = false,
}: FormProductType) => {
  const [loading, setLoading] = useState(false);
  const [floatValue, setFloatValue] = useState(initialValues.price ?? 0);
  const [inputImages, setInputImages] = useState<string[]>(
    initialValues.images ?? [""]
  );

  const handleSubmit = useCallback(
    async (
      values: FormProductValues,
      formikHelpers: FormikHelpers<FormProductValues>
    ) => {
      try {
        setLoading(true);
        await formFunction({
          ...values,
          price: floatValue,
        });

        if (isCreate) {
          formikHelpers.resetForm();
          setInputImages([""]);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, inputImages, floatValue]
  );

  const handleAddInputImage = useCallback(() => {
    setInputImages([...inputImages, ""]);
  }, [inputImages]);

  const handleRemoveInputImage = useCallback(
    (index: number) => {
      setInputImages(inputImages.filter((_, i) => i !== index));
    },
    [inputImages]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formProductValidationSchema}
      onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <CustomInput
            label="Title"
            placeholder="Enter a title"
            name="title"
            value={values.title}
          />
          <CustomInput
            label="Description"
            placeholder="Enter a description"
            name="description"
            value={values.description}
          />
          <CustomInput
            isCurrency
            label="Price"
            placeholder="Enter a price"
            name="price"
            value={values.price}
            hasError={errors.price && touched.price}
            messageError={errors.price}
            onChangeValue={(val) => {
              const { floatValue } = val;
              setFloatValue(floatValue!);
            }}
          />

          <CustomInput
            label="Discount Percentage"
            mask="999%"
            placeholder="Enter a discount Percentage"
            name="discountPercentage"
            value={values.discountPercentage}
            hasError={errors.discountPercentage && touched.discountPercentage}
            messageError={errors.discountPercentage}
          />

          <CustomInput
            mask="9.99"
            label="Rating"
            placeholder="Enter a rating"
            name="rating"
            value={values.rating}
            hasError={errors.rating && touched.rating}
            messageError={errors.rating}
          />

          <CustomInput
            label="Stock"
            placeholder="Enter a stock"
            name="stock"
            value={values.stock}
            hasError={errors.stock && touched.stock}
            messageError={errors.stock}
          />
          <CustomInput
            label="Brand"
            placeholder="Enter a brand"
            name="brand"
            value={values.brand}
          />
          <CustomInput
            label="Category"
            placeholder="Enter a category"
            name="category"
            value={values.category}
          />
          <CustomInput
            label="Thumbnail"
            placeholder="Enter a thumbnail link. Ex.: www.site.com"
            name="thumbnail"
            value={values.thumbnail}
            hasError={errors.thumbnail && touched.thumbnail}
            messageError={errors.thumbnail}
          />

          {inputImages.map((input, index) => (
            <Row key={index}>
              <Col sm={10}>
                <CustomInput
                  label={`Image - ${index + 1}`}
                  placeholder="Enter a image link"
                  name={`images[${index}]`}
                  value={input}
                  onChange={(e) => {
                    const newImages = inputImages.map((image, i) =>
                      i === index ? e.currentTarget.value : image
                    );
                    setInputImages(newImages);
                    setFieldValue("images", newImages);
                  }}
                  hasError={
                    errors.images! && touched.images && errors.images![index]
                  }
                  messageError={errors.images! ? errors.images![index] : ""}
                />
              </Col>
              <Col style={{ marginTop: 31 }}>
                {index === 0 ? (
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleAddInputImage}
                  >
                    <BiAddToQueue />
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => handleRemoveInputImage(index)}
                  >
                    <FaTrashAlt />
                  </Button>
                )}
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-end">
            <Button variant="danger" type="submit" disabled={loading}>
              {`${textButton} `}
              {loading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormProduct;

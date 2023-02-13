import { Spinner } from "react-bootstrap";

const CustomSpinnerLoading = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="danger" />
    </div>
  );
};

export default CustomSpinnerLoading;

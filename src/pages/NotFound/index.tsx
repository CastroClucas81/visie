import { Container, Image } from "react-bootstrap";
import notFound from "./../../../assets/not-found.png";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <Container className={styles.content}>
      <Image src={notFound} alt="Not found image" />
    </Container>
  );
};

export default NotFound;

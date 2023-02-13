import { Button } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import styles from "./styles.module.css";

type TableButtonsProps = {
  infoAction: Function;
  editAction: Function;
  deleteAction: Function;
};

const TableButtons = ({
  infoAction,
  editAction,
  deleteAction,
}: TableButtonsProps) => {
  return (
    <>
      <Button
        variant="info"
        className={styles.defaultMargin}
        onClick={() => infoAction()}
      >
        <AiFillEye />
      </Button>
      <Button
        variant="warning"
        className={styles.defaultMargin}
        onClick={() => editAction()}
      >
        <AiFillEdit />
      </Button>
      <Button variant="danger" onClick={() => deleteAction()}>
        <AiFillDelete />
      </Button>
    </>
  );
};

export default TableButtons;

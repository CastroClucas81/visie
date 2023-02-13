import { ListGroup } from "react-bootstrap";

type CustomListGroupItemProps = {
  title: string;
  description?: string;
};

const CustomListGroupItem = ({
  title,
  description,
}: CustomListGroupItemProps) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{title}</div>
        {description ?? "Empty"}
      </div>
    </ListGroup.Item>
  );
};

export default CustomListGroupItem;

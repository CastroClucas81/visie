import { Image, ListGroup } from "react-bootstrap";
import undefinedImage from "./../../../assets/not-found.png";

type CustomListGroupImageItemProps = {
  title: string;
  image?: string;
};

const CustomListGroupImageItem = ({
  title,
  image = undefinedImage,
}: CustomListGroupImageItemProps) => {
  return (
    <ListGroup.Item as="li">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{title}</div>
        <Image
          style={{ objectFit: "cover", height: 250, width: 250 }}
          src={image}
          alt={`image ${image}`}
          thumbnail
        />
      </div>
    </ListGroup.Item>
  );
};

export default CustomListGroupImageItem;

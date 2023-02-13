import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import logo from "./../../../assets/logo.svg";
import { IoIosCreate } from "react-icons/io";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} role="button">
          <img src={logo} alt="visie-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <NavDropdown title="Product">
              <NavDropdown.Item onClick={() => navigate("/")}>
                <AiOutlineUnorderedList /> Product List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("/create-product")}>
                <IoIosCreate /> New Product
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

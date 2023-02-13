import { useRoutes } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";
import PutProduct from "../pages/PutProduct";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <ProductList />,
    },
    {
      path: "/create-product",
      element: <CreateProduct />,
    },
    {
      path: "/product-detail/:id",
      element: <ProductDetail />,
    },
    {
      path: "/edit-product/:id",
      element: <PutProduct />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;

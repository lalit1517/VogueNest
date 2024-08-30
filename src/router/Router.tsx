import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ProductList from "../components/ProductList";
import Orders from "../components/Orders";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default Routers;

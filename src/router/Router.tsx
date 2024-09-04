import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ProductList from "../components/ProductList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ProductList />} />
    </Routes>
  );
};

export default Routers;

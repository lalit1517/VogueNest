import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Orders from "./components/Orders";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";

type ViewType = "products" | "cart" | "orders";

function App() {
  const [view, setView] = useState<ViewType>("products");

  let pageContent;
  switch (view) {
    case "cart":
      pageContent = <Cart />;
      break;
    case "orders":
      pageContent = <Orders />;
      break;
    default:
      pageContent = <ProductList />;
  }

  const content = (
    <>
      <AuthProvider>
        <Header view={view} setView={setView} />
        {pageContent}
        <Footer view={view} setView={setView} />
      </AuthProvider>
    </>
  );

  return content;
}

export default App;

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Orders from "./components/Orders";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

type ViewType = "products" | "cart" | "orders";

function App() {
  const [view, setView] = useState<ViewType>("products");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [view]);

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
        <div className="pt-[97px]"> 
          {pageContent}
        </div>
        <Footer view={view} setView={setView} />
      </AuthProvider>
    </>
  );

  return content;
}

export default App;

type ViewType = "products" | "cart" | "orders";

type PropsType = {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
};

const Nav = ({ view, setView }: PropsType) => {
  const buttons = (
    <>
      <button onClick={() => setView("products")} className={view === "products" ? "active" : ""}>
        Products
      </button>
      <button onClick={() => setView("cart")} className={view === "cart" ? "active" : ""}>
        Cart
      </button>
      <button onClick={() => setView("orders")} className={view === "orders" ? "active" : ""}>
        Orders
      </button>
    </>
  );

  const content = <nav className="nav">{buttons}</nav>;

  return content;
};

export default Nav;

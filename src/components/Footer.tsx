import useCart from "../hooks/useCart";

type ViewType = "products" | "cart" | "orders";

type PropsType = {
  view: ViewType;
};

const Footer = ({ view }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent =
    view === "orders" ? (
      <p>Shopping Cart &copy; {year}</p>
    ) : (
      <>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <p>Shopping Cart &copy; {year}</p>
      </>
    );

  const content = <footer className="footer">{pageContent}</footer>;

  return content;
};

export default Footer;

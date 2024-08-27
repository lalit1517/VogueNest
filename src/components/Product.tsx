import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement, memo, useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import "@fortawesome/fontawesome-free/css/all.min.css";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
}: PropsType): ReactElement => {
  const [isClicked, setIsClicked] = useState<boolean>(() => {
    const storedState = localStorage.getItem(`${product.sku}`);
    return storedState ? JSON.parse(storedState) : false;
  });

  const [isLoading, setIsLoading] = useState(true);

  const img: string = `https://cart-services-jntk.onrender.com/public/images/${product.sku}.jpeg`;

  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      setIsLoading(false);
    };
  }, [img]);

  const onAddToCart = () => {
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
    setIsClicked(true);
  };

  const onRemoveFromCart = () => {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: { ...product, qty: 1 } });
    setIsClicked(false);
  };

  useEffect(() => {
    localStorage.setItem(`${product.sku}`, JSON.stringify(isClicked));
  }, [isClicked, product.sku]);

  const content = (
    <>
      <article className="product">
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-0 items-center justify-between">
          <div className="sm:h-16 md:h-20 lg:h-24 text-red-600 text-xl sm:text-sm md:text-xl italic w-full flex items-center justify-center font-bold">
            <div>{product.name}</div>
          </div>
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={325} animation="pulse" />
          ) : (
            <img src={img} alt={product.name} className="w-full" />
          )}
        </div>

        <div className={`bottom ${isClicked ? "clicked" : ""}`}>
          <div className="left">
            <div className="details cursor-default text-white sm:text-base lg:text-xl flex items-center justify-center w-3/4">
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </p>
            </div>
            <div className="buy cursor-pointer sm:text-lg lg:text-2xl w-1/4 flex items-center justify-center text-white" onClick={onAddToCart}>
              <i className="fa-solid fa-cart-plus"></i>
            </div>
          </div>
          <div className="right">
            <div className="done cursor-pointer sm:text-lg lg:text-2xl w-1/4 flex items-center justify-center">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="details cursor-default h-1/2 sm:text-base lg:text-xl flex text-center items-center justify-center w-3/4">
              <p>Added to your cart</p>
            </div>
            <div className="remove cursor-pointer sm:text-lg lg:text-2xl flex items-center justify-center w-1/4" onClick={onRemoveFromCart}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
      </article>
    </>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;

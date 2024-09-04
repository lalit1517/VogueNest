import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement, memo, useState, useEffect, useCallback } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-loading-skeleton/dist/skeleton.css";
import "react-medium-image-zoom/dist/styles.css";

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
  inCart,
}: PropsType): ReactElement => {
  const [isClicked, setIsClicked] = useState<boolean>(() => {
    const storedState = localStorage.getItem(`${product.sku}`);
    return storedState ? JSON.parse(storedState) : false;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback(
    (shouldZoom: boolean | ((prevState: boolean) => boolean)) => {
      setIsZoomed(shouldZoom);
    },
    []
  );

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
    if (!inCart) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (!inCart) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }, [inCart]);

  useEffect(() => {
    localStorage.setItem(`${product.sku}`, JSON.stringify(isClicked));
  }, [isClicked, product.sku]);

  return (
    <article className="product">
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-0 items-center justify-between">
        <div className="sm:h-16 md:h-20 lg:h-24 text-[#E53935] text-xl sm:text-sm md:text-xl italic w-full flex items-center justify-center font-bold">
          <div>{product.name}</div>
        </div>
        {isLoading ? (
          <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E5E4E2">
            <Skeleton
              borderRadius={0}
              height="100%"
              width="100%"
              containerClassName="w-full h-[340px] sm:h-[154] md:h-[210px] lg:h-[280px] xl:h-[335px] 2xl:h-[388px]"
            />
          </SkeletonTheme>
        ) : (
          <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
            <img src={img} alt={product.name} className="w-full" />
          </ControlledZoom>
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
          <div
            className="buy cursor-pointer sm:text-lg lg:text-2xl w-1/4 flex items-center justify-center text-white"
            onClick={onAddToCart}
          >
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
          <div
            className="remove cursor-pointer sm:text-lg lg:text-2xl flex items-center justify-center w-1/4"
            onClick={onRemoveFromCart}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </article>
  );
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

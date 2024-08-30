import { memo, useState, useEffect } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const [isLoading, setIsLoading] = useState(true);

  const img: string = `https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`;

  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      setIsLoading(false);
    };
  }, [img]);

  const lineTotal: number = item.qty * item.price;

  const onIncrement = () => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: item.qty + 1 },
    });
  };

  const onDecrement = () => {
    if (item.qty > 1) {
      dispatch({
        type: REDUCER_ACTIONS.QUANTITY,
        payload: { ...item, qty: item.qty - 1 },
      });
    }
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  const content = (
    <li className="list-none">
      <div className="flex justify-between items-stretch container h-20">
        <div className="flex items-start gap-8 w-2/3 item-in-cart">
          <div className="relative h-20 flex items-center">
            {isLoading ? (
              <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E5E4E2">
                <Skeleton
                  borderRadius={0}
                  height="100%"
                  width="100%"
                  containerClassName="w-20 h-20"
                />
              </SkeletonTheme>
            ) : (
              <div className="relative">
                <img src={img} alt={item.name} className="h-20 w-20" />
                <button
                  className="absolute top-0 right-0 transform translate-x-[50%] translate-y-[-50%] text-xs bg-black text-white p-1 rounded-full"
                  aria-label="Remove Item From Cart"
                  title="Remove Item From Cart"
                  onClick={onRemoveFromCart}
                >
                  ❌
                </button>
              </div>
            )}
          </div>
          <div className="font-extrabold text-sm h-full w-1/3 md:w-1/2"><div>{item.name}</div></div>
        </div>
        <div className="flex flex-col justify-between items-end w-1/4 h-full itemprice-in-cart">
          <div className="text-base font-extrabold">
            <div>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(lineTotal)}
            </div>
          </div>
          <div className="flex items-center justify-between w-full border border-black px-3 py-2">
            <button onClick={onDecrement} className="font-semibold">-</button>
            <span className="text-sm font-extrabold">{item.qty}</span>
            <button onClick={onIncrement} className="font-semibold">+</button>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-black w-full mt-6"></div>
    </li>
  );

  return content;
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;

import { memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const img: string = `https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`;

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
    console.log(`Removing item with SKU: ${item.sku}`);

    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

    const localStorageKey = `${item.sku}`;
    if (localStorage.getItem(localStorageKey)) {
      localStorage.removeItem(localStorageKey);
    }
  };

  const content = (
    <li className="list-none">
      <div className="flex justify-between relative items-stretch container h-20">
        <div className="flex items-start gap-6 w-2/3 item-in-cart">
          <div className="relative w-1/2 h-20">
            <img src={img} alt={item.name} className="h-20 w-20" />
            <button
              className="absolute left-[83%] bottom-[83%] text-xs bg-black text-white p-1 rounded-full"
              aria-label="Remove Item From Cart"
              title="Remove Item From Cart"
              onClick={onRemoveFromCart}
            >
              ❌
            </button>
          </div>
          <div className="font-extrabold text-sm h-full">{item.name}</div>
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
            <button onClick={onDecrement}>-</button>
            <span className="text-sm font-extrabold">{item.qty}</span>
            <button onClick={onIncrement}>+</button>
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

import {
  useMemo,
  useReducer,
  useEffect,
  createContext,
  ReactElement,
  useState,
} from "react";
import { useAuth } from "../context/AuthContext";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SET: "SET",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType | CartItemType[];
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload || !("sku" in action.payload))
        throw new Error("action.payload missing in ADD action");

      const { sku, name, price } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload || !("sku" in action.payload))
        throw new Error("action.payload missing in REMOVE action");

      const { sku } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: filteredCart };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload || !("sku" in action.payload))
        throw new Error("action.payload missing in QUANTITY action");

      const { sku, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!itemExists)
        throw new Error("Item must exist in order to update quantity");

      const updatedItem: CartItemType = { ...itemExists, qty };
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SET: {
      if (!Array.isArray(action.payload)) {
        throw new Error("action.payload must be an array for SET action");
      }

      return { ...state, cart: action.payload };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const fetchCartFromBackend = async (userId: string) => {
  try {
    const response = await fetch(
      `https://cart-services-jntk.onrender.com/api/cart/${userId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.cart;
    } else {
      throw new Error("Failed to fetch cart");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const updateCartInBackend = async (userId: string, cart: CartItemType[]) => {
  try {
    const response = await fetch(
      `https://cart-services-jntk.onrender.com/api/cart/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      }
    );
    if (!response.ok) throw new Error("Failed to update cart");
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const { user } = useAuth();
  const userId = user?.sub || localStorage.getItem("userId");

  const [state, dispatch] = useReducer(reducer, initCartState, (initial) => {
    if (!userId) {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? { cart: JSON.parse(savedCart) } : initial;
    }
    return initial;
  });

  useEffect(() => {
    if (userId) {
      (async () => {
        const cartFromBackend = await fetchCartFromBackend(userId);
        const savedCart = localStorage.getItem("cart");
        const cartFromLocalStorage = savedCart ? JSON.parse(savedCart) : [];

        if (cartFromBackend.length > 0) {
          const filteredLocalCart = cartFromLocalStorage.filter(
            (localItem: { sku: any }) =>
              !cartFromBackend.some(
                (backendItem: { sku: any }) => backendItem.sku === localItem.sku
              )
          );

          const combinedCart = [...filteredLocalCart, ...cartFromBackend];

          dispatch({ type: REDUCER_ACTION_TYPE.SET, payload: combinedCart });
        }
      })();
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    if (userId) {
      updateCartInBackend(userId, state.cart);
    }
  }, [state.cart, userId]);

  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce(
    (previousValue, cartItem) => previousValue + cartItem.qty,
    0
  );

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce(
      (previousValue, cartItem) =>
        previousValue + cartItem.qty * cartItem.price,
      0
    )
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  const placeOrder = () => setOrderPlaced(true);
  const resetOrderPlaced = () => setOrderPlaced(false);

  return {
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    totalPrice,
    cart,
    orderPlaced,
    placeOrder,
    resetOrderPlaced,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
  orderPlaced: false,
  placeOrder: () => {},
  resetOrderPlaced: () => {},
};

const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

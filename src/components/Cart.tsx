import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";
import Modal from "./Modal";
import { jwtDecode } from "jwt-decode";

type OrderType = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: {
    houseNo: string;
    street: string;
    city: string;
    state: string;
  };
  items: {
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: string;
  paymentMode: string;
  orderDate: string;
  expectedArrivalDate: string;
};

interface DecodedJwtPayload {
  name?: string;
  email?: string;
  picture?: string;
}

const Cart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState<DecodedJwtPayload | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [houseNo, setHouseNo] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onPlaceOrderClick = () => {
    const token = localStorage.getItem("google_jwt");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedJwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null); 
      }
    } else {
      setUser(null); 
    }

    setShowModal(true);
  };

  const handleSubmitForm = async () => {
    if (!name || !email || !phone || !houseNo || !street || !city || !state) {
      alert("Please fill all the required fields.");
      return;
    }
  
    setShowModal(false);
  
    const userId = localStorage.getItem("userId"); 
  
    const orderDate = new Date();
    const expectedArrivalDate = new Date(orderDate);
    expectedArrivalDate.setDate(orderDate.getDate() + 3);
  
    const formattedOrderDate = orderDate.toISOString().split("T")[0];
    const formattedExpectedArrivalDate = expectedArrivalDate
      .toISOString()
      .split("T")[0];
  
    const orderData: OrderType = {
      userId: userId || "",
      name,
      email,
      phone,
      address: {
        houseNo,
        street,
        city,
        state,
      },
      items: cart.map((item) => ({
        sku: item.sku,
        name: item.name,
        quantity: item.qty,
        price: item.price,
      })),
      totalPrice,
      paymentMode: "Cash on Delivery",
      orderDate: formattedOrderDate,
      expectedArrivalDate: formattedExpectedArrivalDate,
    };
  
    try {
      const res = await fetch("https://cart-services-jntk.onrender.com/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (res.ok) {
        console.log("Order submitted successfully");
        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
        orderData.items.forEach(item => {
          const key = item.sku;
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
          }
        });
      } else {
        const errorData = await res.json();
        console.error("Failed to submit order:", errorData);
        alert(`Failed to save order: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error occurred while saving order:", error);
      alert("An error occurred while saving the order. Please try again.");
    }
  };
  

  const pageContent = (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => (
          <CartLineItem
            key={item.sku}
            item={item}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart__submit"
          onClick={onPlaceOrderClick}
          disabled={!totalItems}
        >
          Place Order
        </button>
      </div>
    </>
  );

  const content = (
    <main className="main main--cart">
      {pageContent}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {!user ? (
          <h2>Please login to place your order</h2>
        ) : (
          <>
            <h2>Enter Your Details</h2>
            <form
              className="cart__form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm();
              }}
            >
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
              <label>
                House No.:
                <input
                  type="text"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  required
                />
              </label>
              <label>
                Street:
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </label>
              <p>Payment Mode: Cash on Delivery</p>
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </Modal>
    </main>
  );

  return content;
};

export default Cart;

import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";
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
  paymentId: string;
  paymentStatus: boolean;
};

interface DecodedJwtPayload {
  name?: string;
  email?: string;
  picture?: string;
}

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
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

  // Check if the user is logged in by decoding the JWT token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("google_jwt");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedJwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const onPlaceOrderClick = () => {
    const token = localStorage.getItem("google_jwt");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedJwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null); // Ensure the user is null on error
      }
    } else {
      setUser(null); // Ensure the user is null if no token is found
    }

    if (!user) {
      setShowModal(true); // Show modal asking the user to log in
    } else {
      setShowModal(true); // Show the order form modal
    }
  };

  const handleSubmitForm = async () => {
    if (!name || !email || !phone || !houseNo || !street || !city || !state) {
        alert("Please fill all the required fields.");
        return;
    }

    setShowModal(false);

    const res = await loadRazorpayScript();

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    const options = {
        key: "rzp_test_8Zs7nAcnJ3g9wP", // Replace with your Razorpay key
        currency: "INR",
        name: name,
        description: "Thank you for your purchase",
        image: "https://vogue-nest.vercel.app/logo.svg",
        handler: async function (response: any) {
            try {
                const orderData: OrderType = {
                    userId: userId || "", // Add userId to the orderData
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
                    paymentId: response.razorpay_payment_id,
                    paymentStatus: true,
                };

                const res = await fetch("http://localhost:5000/api/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });

                if (res.ok) {
                    console.log("Payment Successful: " + response.razorpay_payment_id);
                    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
                    setConfirm(true);
                } else {
                    alert("Failed to save order");
                }
            } catch (error) {
                console.log("Error occurred while saving order");
            }
        },
        prefill: {
            name: name,
            email: email,
            contact: phone,
        },
        notes: {
            address: `${houseNo}, ${street}, ${city}, ${state}`,
        },
        theme: {
            color: "#F37254",
        },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
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
        <p>Total Price: ₹{totalPrice}</p>
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

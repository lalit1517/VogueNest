import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";
import CartLineItem from "./CartLineItem";
import Modal from "./Modal"; // Import the Modal component

type OrderType = {
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

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [houseNo, setHouseNo] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
  const [orders, setOrders] = useState<OrderType[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Use useEffect to store orders in localStorage whenever they update
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

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
    setShowModal(true);
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

    const options = {
      key: "rzp_test_8Zs7nAcnJ3g9wP", // Replace with your Razorpay key
      currency: "INR",
      name: name,
      description: "Thank you for your purchase",
      image: "https://vogue-nest.vercel.app/logo.svg",
      handler: async function (response: any) {
        try {
          const orderData: OrderType = {
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
            setOrders((prevOrders) => [...prevOrders, orderData]); // Add the order to the orders state
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

  const ordersContent = orders.length > 0 && (
    <section className="orders">
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <li key={index} className="cart__item">
            {order.items.map((item, idx) => (
              <img key={idx}
              src={`https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`}
              style={{ width: '50px', height: '50px', marginRight: '10px' }} 
          />
            ))}
          <h3>Order {index + 1}</h3>
          <p>Name: {order.name}</p>
          <p>Email: {order.email}</p>
          <p>Phone: {order.phone}</p>
          <p>
            Address: {order.address.houseNo}, {order.address.street},{" "}
            {order.address.city}, {order.address.state}
          </p>
          <p>Total Price: ₹{order.totalPrice}</p>
          <p>Payment ID: {order.paymentId}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.quantity} x ₹{item.price}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </section>
  );

  const pageContent = confirm ? (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <button
          className="cart__submit"
          disabled={!totalItems}
          onClick={onPlaceOrderClick}
        >
          Place Order
        </button>
      </div>
      {ordersContent}
    </>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <button
          className="cart__submit"
          disabled={!totalItems}
          onClick={onPlaceOrderClick}
        >
          Place Order
        </button>
      </div>
      {ordersContent}
    </>
  );

  const content = (
    <main className="main main--cart">
      {pageContent}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
          <button type="submit" className="modal-close">
            Submit and Pay
          </button>
        </form>
      </Modal>
    </main>
  );

  return content;
};

export default Cart;

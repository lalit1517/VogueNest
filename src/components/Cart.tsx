import useCart from "../hooks/useCart";
import {ReactElement, useState, useRef, useEffect } from "react";
import CartLineItem from "./CartLineItem";
import Modal from "./Modal";
import { jwtDecode } from "jwt-decode";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  orderDate: string;
  expectedArrivalDate: string;
};

interface DecodedJwtPayload {
  name?: string;
  email?: string;
  picture?: string;
}

const Cart = ({ isOpen, onClose }: ModalProps): ReactElement => {
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

  const [topHeight, setTopHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);

  const topPartRef = useRef<HTMLDivElement>(null);
  const bottomPartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topPartRef.current) {
      setTopHeight(topPartRef.current.offsetHeight);
    }
    if (bottomPartRef.current) {
      setBottomHeight(bottomPartRef.current.offsetHeight);
    }
  }, []);

  const sanitizedPrice = totalPrice.replace('$', '');
  const taxAmount = (Number(sanitizedPrice) * 0.18).toFixed(2);

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

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const userId = localStorage.getItem("userId");

    const orderDate = new Date();
    const expectedArrivalDate = new Date(orderDate);
    expectedArrivalDate.setDate(orderDate.getDate() + 3);

    const formattedOrderDate = orderDate.toISOString().split("T")[0];
    const formattedExpectedArrivalDate = expectedArrivalDate
      .toISOString()
      .split("T")[0];

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: "INR",
      name: name,
      description: "Thank you for your purchase",
      image: "https://vogue-nest.vercel.app/logo.svg",
      handler: async function (response: any) {
        try {
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
            paymentId: response.razorpay_payment_id,
            paymentStatus: true,
            orderDate: formattedOrderDate,
            expectedArrivalDate: formattedExpectedArrivalDate,
          };

          const res = await fetch(
            "https://cart-services-jntk.onrender.com/api/order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            }
          );

          if (res.ok) {
            console.log("Payment Successful");
            dispatch({ type: REDUCER_ACTIONS.SUBMIT });
            orderData.items.forEach((item) => {
              const key = item.sku;
              if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
              }
            });
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
      <>
      {isOpen && (
        <div
        className={`fixed inset-0 bg-black z-[10000] duration-1000 transition-all ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      )}
      <div
        className={`fixed w-full md:w-1/2 lg:w-2/5 xl:w-[30%] min-h-screen bg-[#f2f2f2] top-0 right-0 z-[11000] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container container-xl-custom w-full h-screen flex flex-col justify-between">
          <div
            ref={topPartRef}
            className="w-full text-end top-part bg-[#f2f2f2]"
          >
            <button
              onClick={onClose}
              className="py-4 font-bold cursor-pointer text-end text-[2rem]"
            >
              CLOSE
            </button>
            <div className="h-[1px] bg-black w-full absolute left-0 z-50"></div>
          </div>

          {/* Middle Part - Scrollable Cart Items */}
          <div
            style={{ top: topHeight, bottom: bottomHeight }}
            className="flex-grow overflow-y-auto py-6 w-full absolute left-0 middle-part"
          >
            <ul className="flex flex-col gap-6">
              {cart.map((item) => (
                <CartLineItem
                  key={item.sku}
                  item={item}
                  dispatch={dispatch}
                  REDUCER_ACTIONS={REDUCER_ACTIONS}
                />
              ))}
            </ul>
          </div>

          <div
            ref={bottomPartRef}
            className="w-full bg-[#f2f2f2] absolute left-0 bottom-0 flex-col items-center justify-between end-part"
          >
            <div className="h-[1px] bg-black w-full"></div>
            <div className="container flex items-center justify-between py-4">
              <div className="text-sm">Taxes</div>
              <div><span className="custom-line-through">${taxAmount}</span><span className="ml-2">$0.00</span></div>
            </div>
            <div className="h-[1px] bg-black w-full"></div>
            <div className="container flex items-center justify-between py-4">
              <div className="text-sm">Shipping Charges</div>
              <div>Free</div>
            </div>
            <div className="h-[1px] bg-black w-full"></div>
            <div className="container flex items-center justify-between py-3 text-[1.5rem] font-extrabold">
              <div className="">Total</div>
              <div>{totalPrice}</div>
            </div>
            <div className="h-[1px] bg-black w-full"></div>
            <button onClick={onPlaceOrderClick} disabled={!totalItems} className="py-4 w-full text-center font-extrabold text-[2rem] bg-black text-white">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
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

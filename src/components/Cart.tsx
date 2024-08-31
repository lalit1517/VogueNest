import useCart from "../hooks/useCart";
import { ReactElement, useState, useRef, useEffect } from "react";
import CartLineItem from "./CartLineItem";
import { jwtDecode } from "jwt-decode";
import Modal from "./Modal";

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
    pinCode: string;
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
  const [pinCode, setPinCode] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
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

  const sanitizedPrice = totalPrice.replace("$", "");
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
    if (
      !name ||
      !email ||
      !phone ||
      !houseNo ||
      !street ||
      !city ||
      !pinCode ||
      !state
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    setShowModal(false);
    onClose();

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
              pinCode,
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
            setShowPopup(true);
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
        address: `${houseNo}, ${street}, ${city}, ${pinCode}, ${state}`,
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
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black z-[10000] duration-1000 transition-all ease-in-out ${
            isOpen ? "opacity-50" : "opacity-0"
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
              <div>
                <span className="custom-line-through text-gray-600">
                  ${taxAmount}
                </span>
                <span className="ml-2">$0.00</span>
              </div>
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
            <button
              onClick={onPlaceOrderClick}
              disabled={!totalItems}
              className="py-4 w-full hover:bg-[#E53935] hover:text-black transition-all duration-300 text-center font-extrabold text-[2rem] bg-black text-white"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const content = (
    <main className="main main--cart">
      {pageContent}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {!user ? (
          <div className="w-full container font-bold text-center text-[#E53935]">
            Please click on user icon to login before placing your order !
          </div>
        ) : (
          <div className="container w-full">
            <div className="w-full font-bold text-[1.5rem] text-center text-black">
              Customer details:
            </div>
            <form
              id="userDetailsForm"
              className="flex flex-col items-center justify-between gap-10 xl:gap-12 w-full py-10"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm();
              }}
            >
              <label className="w-full flex flex-col h-20 items-start justify-between ">
                <div className="text-sm font-medium">Name*</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
              </label>
              <label className="w-full flex flex-col h-20 items-start justify-between ">
                <div className="text-sm font-medium">Email*</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your e-mail address"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
              </label>
              <label className="w-full flex flex-col h-20 items-start justify-between ">
                <div className="text-sm font-medium">Phone*</div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Your phone number"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
              </label>
              <label className="w-full flex flex-col items-start gap-1 justify-between ">
                <div className="text-sm font-medium">Address*</div>
                <div className="w-full flex flex-col items-start justify-between gap-3">
                <input
                  type="text"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  required
                  placeholder="Address line 1"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  placeholder="Address line 2"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="City"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                  placeholder="Pin Code"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  placeholder="State"
                  className="py-4 bg-transparent border border-transparent border-b-black w-full focus:outline-none focus:placeholder-transparent font-semibold"
                />
                </div>
              </label>
            </form>
          </div>
        )}
      </Modal>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-5/6 md:w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute  top-2 right-4 font-bold text-[2rem] hover:text-gray-800 text-[#E53935] transition-colors duration-300"
            >
              &times;
            </button>
            <h3 className="text-xl font-extrabold my-6">
              Thank you for placing the order!
            </h3>
            <p className="mb-4 font-semibold">Keep Shopping with VogueNest.</p>
          </div>
        </div>
      )}
    </main>
  );

  return content;
};

export default Cart;

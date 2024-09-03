import { ReactElement, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Orders = ({ isOpen, onClose }: ModalProps): ReactElement => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    const userId = user?.sub || localStorage.getItem("userId");

    if (userId) {
      try {
        const response = await axios.get(
          `https://cart-services-jntk.onrender.com/api/orders/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setError("No user is logged in");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const sliderRef = useRef<Slider>(null);

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 900,
    ref: sliderRef,
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center transition-all duration-500 justify-center w-full bg-black bg-opacity-50 z-[11111] ${
            isOpen ? "scale-x-100" : "scale-x-0"
          }`}
        >
          <button
            onClick={handlePrevClick}
            className="absolute top-[45%] md:left-2 lg:left-4 xl:left-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f2f2f2"
              className="bi bi-chevron-left w-16 h-16"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="absolute top-[45%] md:right-2 lg:right-4 xl:right-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f2f2f2"
              className="bi bi-chevron-right w-16 h-16"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
          <div className="overflow-hidden w-full md:w-5/6 h-[80%] md:h-[60%] xl:h-[85%] content-center">
            <Slider {...settings}>
              {orders.map((order, index) => (
                <li
                  key={index}
                  className="w-full md:h-[60vh] xl:h-[85vh] flex items-center place-content-center"
                >
                  <div className="w-[97%] md:h-[55vh] xl:h-[80vh] bg-[#f2f2f2] rounded-lg shadow-lg mx-auto overflow-x-hidden overflow-y-auto">
                    <div className="flex justify-between items-center gap-3 my-4 px-6">
                      <div>
                        <p className="text-lg font-semibold">
                          Invoice No: #{index + 1}
                        </p>
                        <p className="text-sm">Placed on: {order.orderDate}</p>
                      </div>
                      <button onClick={onClose} className="text-white hover:bg-[#E53935] hover:text-black transition-all duration-300 font-extrabold text-[1.5rem] border bg-black px-6 py-2">
                        CLOSE
                      </button>
                    </div>
                    <div className="flex items-center justify-center my-4 overflow-hidden">
                      <div className="w-full bg-[#E53935] h-[1px] opacity-50"></div>
                    </div>

                    <div className="w-full px-6 my-4">
                      <ul className="overflow-hidden w-full flex flex-col border border-black rounded-xl">
                        <div className="flex flex-col gap-4">
                          {order.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center justify-between w-full overflow-hidden"
                            >
                              <div className="flex flex-col gap-4 items-center justify-between w-2/3 p-6">
                                <span className="font-extrabold text-[1.5rem] text-center">
                                  {item.name}
                                </span>
                                <span className="text-lg font-semibold">{item.quantity} x ${item.price}</span>
                              </div>
                              <div className="w-1/3">
                                <img
                                  src={`https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`}
                                  alt={item.name}
                                />
                              </div>
                            </li>
                          ))}
                        </div>
                        <div className="w-full h-[1px] bg-black"></div>
                        <div className="p-6">
                          <div className="font-extrabold text-[1.5rem] mb-4">Order Details</div>
                          <div className="space-y-3 flex flex-col justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">
                              Shipping Address
                            </span>
                            <div>
                            {order.name}, {order.address.houseNo},{" "}
                            {order.address.street}, {order.address.city},{" "}
                            {order.address.pinCode}, {order.address.state}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">Total Price</span>
                            <div>{order.totalPrice}</div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">
                              Expected Arrival
                            </span>
                            <div>{order.expectedArrivalDate}</div>
                          </div>
                          </div>
                        </div>
                      </ul>
                    </div>

                    <div className="track-order w-full px-6 my-4 relative">
                      <div className="border border-black px-6 rounded-lg">
                      <div className="text-[1.5rem] my-4 font-extrabold">Track Order</div>
                        <div className="w-full flex items-center justify-between my-12 relative">
                          <div
                            className="absolute top-[40%] border-t-4 border-black z-0"
                            style={{ left: "12.5%", right: "6.5%" }}
                          ></div>

                          <div className="absolute top-[40%] left-[12.5%] right-[69%] border-t-4 border-[#E53935] z-0"></div>

                          <div className="flex flex-col items-center gap-4 w-1/4 relative z-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="bi bi-bag-fill w-1/3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                            </svg>
                            <div>Order Placed</div>
                          </div>

                          <div className="flex flex-col items-center gap-4 w-1/4 relative z-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="bi bi-box2-fill w-1/3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6z" />
                            </svg>
                            <div>Shipped</div>
                          </div>

                          <div className="flex flex-col items-center gap-4 w-1/4 relative z-10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="60"
                              height="64"
                              id="truck"
                            >
                              <path fill="none" d="M0 0h48v48H0z"></path>
                              <path d="M40 16h-6V8H6c-2.21 0-4 1.79-4 4v22h4c0 3.31 2.69 6 6 6s6-2.69 6-6h12c0 3.31 2.69 6 6 6s6-2.69 6-6h4V24l-6-8zM12 37c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm27-18 3.93 5H34v-5h5zm-3 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                            </svg>
                            <div>Out for Delivery</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;

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
      setError("Login using the user icon to view the orders.");
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
        ><div>
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
          </div>
          <div className="overflow-hidden w-full md:w-5/6 h-[80%] md:h-[60%] xl:h-[85%] content-center">
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <p className="loader"></p>
              </div>
            ) : error ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-5/6 md:w-full relative">
                  <button
                    onClick={onClose}
                    className="absolute  top-2 right-4 font-bold text-[2rem] hover:text-gray-800 text-[#E53935] transition-colors duration-300"
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-extrabold my-6">{error}</h3>
                </div>
              </div>
            ) : orders.length > 0 ? (
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
                          <p className="text-sm">
                            Placed on: {order.orderDate}
                          </p>
                        </div>
                        <button
                          onClick={onClose}
                          className="text-white hover:bg-[#E53935] hover:text-black transition-all duration-300 font-extrabold text-[1.5rem] border bg-black px-6 py-2"
                        >
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
                                  <span className="text-lg font-semibold">
                                    {item.quantity} x ${item.price}
                                  </span>
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
                            <div className="font-extrabold text-[1.5rem] mb-4">
                              Order Details
                            </div>
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
                                <span className="font-semibold">
                                  Total Price
                                </span>
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
                    </div>
                  </li>
                ))}
              </Slider>
            ) : (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-5/6 md:w-full relative">
                  <button
                    onClick={onClose}
                    className="absolute  top-2 right-4 font-bold text-[2rem] hover:text-gray-800 text-[#E53935] transition-colors duration-300"
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-extrabold my-6">
                    No orders found.
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;

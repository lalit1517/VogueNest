import { ReactElement, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import useCart from "../hooks/useCart";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  sku: string;
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: string;
  paymentId: string;
  paymentStatus: boolean;
  orderDate: string;
  expectedArrivalDate: string;
};

const Orders = ({ isOpen, onClose }: ModalProps): ReactElement => {
  const { user } = useAuth();
  const { orderPlaced, resetOrderPlaced } = useCart();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

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
      setError("Please login to view your orders!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    resetOrderPlaced();
  }, [user, orderPlaced]);

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

  const handleViewMoreClick = (index: number) => {
    setExpandedOrderId(expandedOrderId === index ? null : index);
  };

  const handleClose = () => {
    onClose();                
    setExpandedOrderId(null);  
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black z-[10000] duration-1000 transition-all ease-in-out ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={handleClose}
        />
      )}
      <div
        className={`fixed w-full md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-[30%] h-dvh bg-[#f2f2f2] top-0 right-0 z-[11000] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container container-xl-custom w-full h-dvh flex flex-col justify-between">
          <div
            ref={topPartRef}
            className="w-full text-end top-part bg-[#f2f2f2]"
          >
            <button
              onClick={handleClose}
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
            {loading ? (
              <div className="w-full container flex items-center h-full justify-center">
                <p className="loader"></p>
              </div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center container font-bold text-center text-[#E53935]">
                <div>{error}</div>
              </div>
            ) : orders.length > 0 ? (
              <ul className="flex flex-col gap-6">
                {orders.map((order, index) => (
                  <li key={index} className="list-none">
                    <div className="flex justify-between items-stretch container h-20">
                      <div
                        key={index}
                        className="flex items-start gap-4 w-2/3 item-in-cart"
                      >
                        <div className="relative h-20 flex items-center">
                          {loading ? (
                            <SkeletonTheme
                              baseColor="#D3D3D3"
                              highlightColor="#E5E4E2"
                            >
                              <Skeleton
                                borderRadius={0}
                                height="100%"
                                width="100%"
                                containerClassName="w-20 h-20"
                              />
                            </SkeletonTheme>
                          ) : (
                            <div className="relative">
                              <img
                                src={`https://cart-services-jntk.onrender.com/public/images/${order.sku}.jpeg`}
                                alt={order.itemName}
                                className="h-20 w-24 sm:w-20"
                              />
                            </div>
                          )}
                        </div>

                        <div className="font-extrabold text-sm h-full w-2/3 sm:w-1/3 md:w-1/2">
                          <div>{order.itemName}</div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end w-1/4 h-full itemprice-in-cart">
                        <div className="text-base font-extrabold">
                          <div>Invoice {index + 1}</div>
                        </div>
                        <button
                          onClick={() => handleViewMoreClick(index)}
                          className=" bg-black text-center text-white w-full border text-sm border-black px-2 py-2 hover:bg-[#E53935] transition-all duration-300"
                        >
                          {expandedOrderId === index ? "Hide..." : "View..."}
                        </button>
                      </div>
                    </div>
                    {expandedOrderId === index && (
                      <div className="transition-all duration-700 w-full ease-in-out bg-[#D3D3D3] mt-4">
                        <div className="flex justify-between items-stretch container py-4">
                          <div className="flex flex-col items-start justify-between gap-4 w-3/5">
                            <div className="font-extrabold text-sm flex flex-col items-start gap-[0.5px]">
                              <div>Shipping Address</div>
                              <div className="font-semibold text-sm ">
                                {order.name}, {order.address.houseNo},<br />
                                {order.address.street}, {order.address.city}{" "}
                                {order.address.pinCode}, <br />
                                {order.address.state}
                              </div>
                            </div>
                            <div className="font-bold text-sm">
                              <div>
                                Placed on: <br />{" "}
                                <span className="font-semibold">
                                  {order.orderDate}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-start gap-4 w-1/4 itemprice-in-cart">
                            <div className="font-bold text-sm">
                              <div>
                                Qty x Price <br />{" "}
                                <span className="font-semibold">
                                  {order.quantity} x ${order.price}
                                </span>
                              </div>
                            </div>
                            <div className="font-bold text-sm">
                              <div>
                                Total Bill <br />{" "}
                                <span className="font-semibold">
                                  {order.totalPrice}
                                </span>{" "}
                              </div>
                            </div>
                            <div className="font-bold text-sm">
                              <div>
                                Arrival By: <br />{" "}
                                <span className="font-semibold">
                                  {order.expectedArrivalDate}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="h-[1px] bg-black w-full mt-6"></div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full h-full flex items-center justify-center container font-bold text-center text-[#E53935]">
                <div>No orders found!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

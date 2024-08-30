import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

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

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    const userId = user?.sub || localStorage.getItem('userId');

    if (userId) {
      try {
        const response = await axios.get(`https://cart-services-jntk.onrender.com/api/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('No user is logged in');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/orders') {
      document.body.style.background = 'linear-gradient(to left, #E53935, rgba(246, 243, 255, 1))';
    } else {
      document.body.style.background = '#F2F2F2';
    }
    return () => {
      document.body.style.background = '#F2F2F2';
    };
  }, [location.pathname]);

  return (
    <section className="gradient-custom">
      <div className='container container-xl-custom py-20'>
      <main className=''>
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <ul className="space-y-6">
          {orders.map((order, index) => (
            <li key={index} className="py-6 border-b-4 border-[#E53935] rounded-lg shadow-xl  bg-white">
              <div className="flex px-6 justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">Invoice No: #{index + 1}</p>
                  <p className="text-sm">Payment Id: {order.paymentId}</p>
                </div>
                <button className="text-white hover:text-red-700 rounded-lg bg-black font-medium py-3 px-2">Cancel Order</button>
              </div>
              <div className='flex items-center justify-center my-4'><div className='w-full bg-[#E53935] h-[2px] opacity-60'></div></div>

              <div className='px-6 w-full'>
              <ul className="space-y-2 w-full">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-center w-full justify-evenly">
                      <div className='flex flex-col items-center justify-between h-full'>
                        <div className="font-semibold">{item.name}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>Price: ${item.price}</div>
                      </div>
                      <div className='w-1/3'>
                      <img
                        src={`https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`}
                        alt={item.name}
                      />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2 px-6">
                <p><span className="font-semibold">Name:</span> {order.name}</p>
                <p><span className="font-semibold">Email:</span> {order.email}</p>
                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                <p>
                  <span className="font-semibold">Address:</span> {order.address.houseNo}, {order.address.street}, {order.address.city}, {order.address.state}
                </p>
                <p><span className="font-semibold">Total Price:</span> ${order.totalPrice}</p>
                <p><span className="font-semibold">Date of Order:</span> {order.orderDate}</p>
                <p><span className="font-semibold">Expected Arrival:</span> {order.expectedArrivalDate}</p>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-4">
                      <img
                        src={`https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>{item.quantity} x ${item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-2">Order Timeline</h4>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full inline-block"></div>
                    <p className="text-sm mt-2">Placed</p>
                  </div>
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full inline-block"></div>
                    <p className="text-sm mt-2">Shipped</p>
                  </div>
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full inline-block"></div>
                    <p className="text-sm mt-2">Out for Delivery</p>
                  </div>
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full inline-block"></div>
                    <p className="text-sm mt-2">Delivered</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
      </main>
      </div>
      
    </section>
  );
};

export default Orders;

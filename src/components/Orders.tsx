import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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

  return (
    <section className="p-4 max-w-4xl mx-auto relative">
      
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Order {index + 1}</h3>
              <p className="mb-1"><span className="font-semibold">Name:</span> {order.name}</p>
              <p className="mb-1"><span className="font-semibold">Email:</span> {order.email}</p>
              <p className="mb-1"><span className="font-semibold">Phone:</span> {order.phone}</p>
              <p className="mb-1">
                <span className="font-semibold">Address:</span> {order.address.houseNo}, {order.address.street}, {order.address.city}, {order.address.state}
              </p>
              <p className="mb-1"><span className="font-semibold">Total Price:</span> {order.totalPrice}</p>
              <p className="mb-1"><span className="font-semibold">Payment ID:</span> {order.paymentId}</p>
              <p className="mb-1"><span className="font-semibold">Date of Order:</span> {order.orderDate}</p>
              <p className="mb-4"><span className="font-semibold">Expected date of Arrival:</span> {order.expectedArrivalDate}</p>
              <h4 className="text-lg font-semibold mb-2">Items:</h4>
              <ul className="space-y-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-4">
                    <img
                      src={`https://cart-services-jntk.onrender.com/public/images/${item.sku}.jpeg`}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>{item.quantity} x ₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </section>
  );
};

export default Orders;

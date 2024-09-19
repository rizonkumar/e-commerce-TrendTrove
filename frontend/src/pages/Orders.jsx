import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import TrackOrder from "./TrackOrder";
import axios from "axios";
import {
  FaShoppingBag,
  FaBox,
  FaShippingFast,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/order/userOrder`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("An error occurred while fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl, token]);

  if (loading) {
    return <div className="mt-8 text-center">Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border-t pt-16 text-center">
        <FaShoppingBag className="mb-4 text-6xl text-gray-300" />
        <Title text1={"MY"} text2={"ORDERS"} />
        <p className="mt-4 text-gray-600">You haven't placed any orders yet.</p>
        <button className="mt-6 rounded-full bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="mb-8 text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col gap-4 rounded-lg border p-4 text-gray-700 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              {order.items && order.items[0] && order.items[0].productId && (
                <img
                  src={order.items[0].productId.image}
                  alt={order.items[0].productId.name || "Product"}
                  className="h-20 w-20 rounded-md object-cover"
                />
              )}
              <div>
                <p className="text-base font-medium sm:text-lg">
                  Order #{order._id.slice(-6)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaBox className="mr-1" />
                    {currency}
                    {order.amount}
                  </p>
                  <p className="flex items-center">
                    <FaShippingFast className="mr-1" />
                    Items: {order.items ? order.items.length : 0}
                  </p>
                  <p className="flex items-center">
                    <MdLocalShipping className="mr-1" />
                    {order.paymentMethod}
                  </p>
                </div>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-1" />
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:w-1/2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <p className="text-sm font-medium text-green-600">
                  {order.status}
                </p>
              </div>
              <TrackOrder orderId={order._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

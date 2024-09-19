import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { backendUrl, token } = useContext(ShopContext);
  console.log("Hello", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/order/userOrder`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setOrders(response.data.orders);
          console.log("Hello", orders);
        } else {
          toast.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("An error occurred while fetching orders");
      }
    };

    fetchOrders();
  }, [backendUrl, token]);

  return (
    <div className="border-t pt-16">
      <div className="mb-8 text-2xl">
        <Title text1={"ORDER"} text2={"HISTORY"} />
      </div>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="rounded-lg border p-4 shadow-sm">
            <div className="flex justify-between">
              <p className="font-medium">Order ID: {order._id}</p>
              <p className="text-gray-600">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-2">Status: {order.status}</p>
            <p className="mt-1">Total Amount: ${order.amount}</p>
            <div className="mt-4">
              <p className="font-medium">Items:</p>
              <ul className="list-inside list-disc">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;

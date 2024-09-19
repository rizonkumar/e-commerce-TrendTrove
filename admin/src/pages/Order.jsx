import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaShoppingBag,
  FaUser,
  FaCalendar,
  FaRupeeSign,
  FaEdit,
  FaCheck,
  FaMapMarkerAlt,
  FaBox,
  FaSearch,
  FaSort,
} from "react-icons/fa";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/order/allOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/updateStatus`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
        setEditingOrderId(null);
        setNewStatus("");
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = orders
    .filter(
      (order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Order Management
      </h1>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <FaSearch className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="rounded-md border px-3 py-2 focus:border-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <select
            className="rounded-md border px-3 py-2 focus:border-indigo-500 focus:outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <button
            className="ml-2 rounded-md bg-gray-200 p-2 hover:bg-gray-300"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <FaSort />
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
          >
            <div className="bg-indigo-600 px-4 py-2 text-white">
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Order ID: {order._id.substring(0, 8)}...
                </span>
                <span className="text-sm">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center">
                <FaUser className="mr-2 text-green-600" />
                <span>{order.userId.name || "N/A"}</span>
              </div>
              <div className="mb-2 flex items-center">
                <FaRupeeSign className="mr-2 text-yellow-600" />
                <span>{order.amount.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex items-center">
                <FaBox className="mr-2 text-blue-600" />
                <span>{order.items.length} item(s)</span>
              </div>
              <div className="mb-2 flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-red-600" />
                <span className="text-sm">
                  {order.address.streetAddress}, {order.address.city},{" "}
                  {order.address.state} - {order.address.zipcode}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-semibold">Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="mb-4">
                {editingOrderId === order._id ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full rounded border px-2 py-1 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : order.status === "Shipped"
                          ? "bg-blue-200 text-blue-800"
                          : order.status === "Processing"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                )}
              </div>
              {editingOrderId === order._id ? (
                <button
                  onClick={() => handleStatusUpdate(order._id)}
                  className="flex w-full items-center justify-center rounded bg-green-500 px-3 py-2 text-white transition duration-300 hover:bg-green-600"
                >
                  <FaCheck className="mr-1" />
                  Update Status
                </button>
              ) : (
                <button
                  onClick={() => setEditingOrderId(order._id)}
                  className="flex w-full items-center justify-center rounded bg-blue-500 px-3 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  <FaEdit className="mr-1" />
                  Edit Status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;

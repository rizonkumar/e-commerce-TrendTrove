import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const TrackOrder = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { backendUrl, token } = useContext(ShopContext);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setOrderDetails(response.data.order);
      } else {
        setError("Failed to fetch order details");
      }
    } catch (error) {
      setError("An error occurred while fetching order details");
    } finally {
      setLoading(false);
    }
  };

  //    Can we use shimmer ui for the loading
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="track-order w-full">
      {orderDetails ? (
        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 font-semibold">Order Details</h3>
          <p>Status: {orderDetails.status}</p>
          <p>Order Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
          <h4 className="mt-2 font-semibold">Items:</h4>
          <ul className="list-disc pl-5">
            {orderDetails.items.map((item, index) => {
              const [productId, sizeInfo] = Object.entries(item)[0];
              const [size, quantity] = Object.entries(sizeInfo)[0];
              return (
                <li key={index}>
                  Product ID: {productId} - Quantity: {quantity}, Size: {size}
                </li>
              );
            })}
          </ul>
          <p className="mt-2">Total Amount: ${orderDetails.amount}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
          <p>Payment Status: {orderDetails.payment ? "Paid" : "Pending"}</p>
          <h4 className="mt-2 font-semibold">Shipping Address:</h4>
          <p>{orderDetails.address.streetAddress}</p>
          <p>
            {orderDetails.address.city}, {orderDetails.address.state}{" "}
            {orderDetails.address.zipcode}
          </p>
          <p>{orderDetails.address.country}</p>
        </div>
      ) : (
        <button
          onClick={fetchOrderDetails}
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Track Order
        </button>
      )}
    </div>
  );
};

export default TrackOrder;

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import {
  FaShoppingBag,
  FaBox,
  FaShippingFast,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  if (!products || products.length === 0) {
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
        {products.slice(1, 4).map((product, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-lg border p-4 text-gray-700 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={product.image[0]}
                alt={product.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div>
                <p className="text-base font-medium sm:text-lg">
                  {product.name}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaBox className="mr-1" />
                    {currency}
                    {product.price}
                  </p>
                  <p className="flex items-center">
                    <FaShippingFast className="mr-1" />
                    Quantity: 1
                  </p>
                  <p className="flex items-center">
                    <MdLocalShipping className="mr-1" />
                    Size: M
                  </p>
                </div>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-1" />
                  Date: 25, July, 2024
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:w-1/2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <p className="text-sm font-medium text-green-600">
                  Ready to Ship
                </p>
              </div>
              <button className="rounded-full border border-black px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

// Mange the UI when ther eis no order
const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  console.log("Products", products);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="">
        {products.slice(1, 4).map((product, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-b border-t py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-16 sm:w-20"
              />
              <div className="">
                <p className="font-medium sm:text-base">{product.name}</p>
                <div className="mt-2 flex items-center gap-3 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {product.price}
                  </p>
                  <p className="text-lg">Quantity: 1</p>
                  <p className="">Size: M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-500">25, July, 2024</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to Ship</p>
              </div>
              <button className="rounded-sm border px-4 py-2 text-sm font-medium">
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

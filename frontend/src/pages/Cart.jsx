import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { FaTrash } from "react-icons/fa";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = Object.entries(cartItems)
      .flatMap(([itemId, sizes]) =>
        Object.entries(sizes).map(([size, quantity]) => ({
          _id: itemId,
          size,
          quantity,
        })),
      )
      .filter((item) => item.quantity > 0);
    setCartData(tempData);
  }, [cartItems]);

  if (cartData.length === 0) {
    return (
      <div className="border-t pt-14 text-center">
        <Title text1="Your" text2="Cart" />
        <p className="mt-8 text-lg text-gray-600">Your cart is empty.</p>
        <Link
          to="/collection"
          className="mt-4 inline-block rounded-full bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="mb-6 flex items-center">
        <Title text1="Your" text2="Cart" />
        <div className="ml-4 hidden h-[2px] w-12 bg-gray-700 sm:block"></div>
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          return (
            <div
              className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 border-b border-t py-4 text-gray-700 sm:grid-cols-[4fr_2fr_0.5fr]"
              key={index}
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-xs font-medium sm:text-lg">
                    {productData.name}
                  </p>
                  <div className="mt-2 flex items-center gap-5">
                    <p className="">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="border bg-slate-50 px-2 sm:px-3 sm:py-1">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                className="w-16 border px-1 py-1 text-center sm:w-20 sm:px-2"
                onChange={(e) =>
                  updateQuantity(
                    item._id,
                    item.size,
                    Number(e.target.value) || 0,
                  )
                }
              />
              <button
                className="text-gray-500 transition-colors hover:text-red-500"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              >
                <FaTrash className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="my-20 flex justify-end">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          {/* Proceed to Checkout button implementation placeholder */}
        </div>
      </div>
    </div>
  );
};

export default Cart;

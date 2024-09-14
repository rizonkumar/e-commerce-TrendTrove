import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { FaTrash } from "react-icons/fa";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
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
        <div className="mt-12 flex flex-col items-center">
          <svg
            className="h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="mt-4 text-xl font-semibold text-gray-800">
            Your cart is empty
          </p>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/collection"
            className="mt-8 inline-block rounded-full bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="mb-8">
        <Title text1="Your" text2="Cart" />
      </div>
      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          return (
            <div
              className="flex flex-col items-center justify-between gap-4 border-b pb-6 sm:flex-row"
              key={index}
            >
              <div className="flex items-center gap-6">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="h-20 w-20 object-cover"
                />
                <div>
                  <p className="text-lg font-medium">{productData.name}</p>
                  <p className="mt-1 text-gray-600">Size: {item.size}</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {currency}
                    {productData.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center rounded border">
                  <button
                    className="bg-gray-100 px-3 py-1 hover:bg-gray-200"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.size,
                        Math.max(1, item.quantity - 1),
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="w-12 border-x py-1 text-center"
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value) || 1,
                      )
                    }
                  />
                  <button
                    className="bg-gray-100 px-3 py-1 hover:bg-gray-200"
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-gray-500 transition-colors hover:text-red-500"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-12 flex justify-end">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <button className="mt-6 w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800" onClick={() => navigate("/place-order")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

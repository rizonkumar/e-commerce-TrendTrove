import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, updateQuantity, products, currency } =
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

  const handleQuantityChange = (itemId, size, newQuantity) => {
    updateQuantity(itemId, size, newQuantity);
  };

  return (
    <div className="w-full border-t pt-8">
      <Title text1="Your" text2="Cart" />
      <div className="mt-8 flex flex-col lg:flex-row lg:gap-8">
        {/* Left Side - Cart Items */}
        <div className="lg:w-2/3">
          {cartData.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              return (
                <div
                  key={index}
                  className="mb-6 flex items-center border-b pb-6"
                >
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="h-24 w-24 object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold">
                      {productData.name}
                    </h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-lg font-medium">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                      className="p-2"
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                      className="p-2"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.size, 0)}
                    className="ml-4 text-gray-500 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side - Cart Total */}
        <div className="lg:w-1/3">
          <div className="sticky top-8 rounded-lg bg-gray-50 p-6 shadow-sm">
            <CartTotal />
            <button className="mt-6 w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

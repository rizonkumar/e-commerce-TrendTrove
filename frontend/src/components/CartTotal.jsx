import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { FaRupeeSign } from "react-icons/fa";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  const renderAmount = (amount) => (
    <span className="flex items-center">
      <FaRupeeSign className="mr-1" />
      {amount.toFixed(2)}
    </span>
  );

  return (
    <div className="w-full">
      <div className="mb-4">
        <Title text1="TOTAL" text2="AMOUNT" />
      </div>
      <div className="mt-2 flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Subtotal</p>
          {renderAmount(subtotal)}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Shipping Fee</p>
          {renderAmount(delivery_fee)}
        </div>
        <div className="mt-2 border-t pt-3">
          <div className="flex items-center justify-between text-base font-bold">
            <p>Total</p>
            {renderAmount(total)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

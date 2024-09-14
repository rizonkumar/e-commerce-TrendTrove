import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { FaRupeeSign } from "react-icons/fa";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="mb-6">
        <Title text1="TOTAL" text2="AMOUNT" />
      </div>
      <div className="mt-2 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="flex items-center">
            <FaRupeeSign className="mr-1" />
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p className="flex items-center">
            <FaRupeeSign className="mr-1" />
            {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p className="flex items-center">
            <FaRupeeSign className="mr-1" />
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

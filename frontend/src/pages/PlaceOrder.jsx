import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);

  const renderInputField = (type, placeholder, className = "") => (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-md border border-gray-300 px-3.5 py-1.5 ${className}`}
    />
  );

  const renderPaymentMethod = (methodName, logo, text) => (
    <div
      onClick={() => setMethod(methodName)}
      className="flex cursor-pointer items-center gap-3 border p-2 px-3"
    >
      <p
        className={`h-3.5 min-w-3.5 rounded-full border ${
          method === methodName ? "bg-green-400" : ""
        }`}
      ></p>
      {logo ? (
        <img src={logo} alt={methodName} className="mx-4 h-5" />
      ) : (
        <p className="mx-4 text-sm font-medium text-gray-500">{text}</p>
      )}
    </div>
  );

  return (
    <div className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14">
      {/* Left Side Section */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          {renderInputField("text", "First Name")}
          {renderInputField("text", "Last Name")}
        </div>
        {renderInputField("email", "Email Address")}
        {renderInputField("text", "Street Address")}
        <div className="flex gap-3">
          {renderInputField("text", "City")}
          {renderInputField("text", "State")}
        </div>
        <div className="flex gap-3">
          {renderInputField("number", "Zipcode")}
          {renderInputField("text", "Country")}
        </div>
        {renderInputField("number", "Contact Number")}
      </div>

      {/* Right Side Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method Selection */}
          <div className="flex flex-col gap-3 lg:flex-row">
            {renderPaymentMethod("stripe", assets.stripe_logo)}
            {renderPaymentMethod("razorpay", assets.razorpay_logo)}
            {renderPaymentMethod("cod", null, "CASH ON DELIVERY")}
          </div>
          <div className="mt-8 w-full text-end">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black px-16 py-3 text-sm text-white"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

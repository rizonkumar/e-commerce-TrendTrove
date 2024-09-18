import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { FaStripe, FaCcAmazonPay, FaMoneyBillWave } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone, MdPerson } from "react-icons/md";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    contactNumber: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { navigate } = useContext(ShopContext);

  const renderInputField = (type, placeholder, icon, className = "") => (
    <div className="relative">
      <input
        onChange={onChangeHandler}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 px-3.5 py-2 pl-10 ${className}`}
      />
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );

  const renderPaymentMethod = (methodName, icon, text) => (
    <div
      onClick={() => setMethod(methodName)}
      className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors ${
        method === methodName
          ? "border-green-500 bg-green-50"
          : "hover:bg-gray-50"
      }`}
    >
      <div
        className={`text-2xl ${method === methodName ? "text-green-500" : "text-gray-400"}`}
      >
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-700">{text}</p>
    </div>
  );

  return (
    <form className="flex min-h-[80vh] flex-col justify-between gap-8 border-t pt-8 lg:flex-row">
      {/* Left Side Section */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          {renderInputField("text", "First Name", <MdPerson />)}
          {renderInputField("text", "Last Name", <MdPerson />)}
        </div>
        {renderInputField("email", "Email Address", <MdEmail />)}
        {renderInputField("text", "Street Address", <MdLocationOn />)}
        <div className="flex gap-3">
          {renderInputField("text", "City", <MdLocationOn />)}
          {renderInputField("text", "State", <MdLocationOn />)}
        </div>
        <div className="flex gap-3">
          {renderInputField("number", "Zipcode", <MdLocationOn />)}
          {renderInputField("text", "Country", <MdLocationOn />)}
        </div>
        {renderInputField("tel", "Contact Number", <MdPhone />)}
      </div>

      {/* Right Side Section */}
      <div className="w-full lg:w-1/2">
        <CartTotal />
        <div className="mt-8">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {renderPaymentMethod("stripe", <FaStripe />, "Stripe")}
            {renderPaymentMethod("razorpay", <FaCcAmazonPay />, "Razorpay")}
            {renderPaymentMethod(
              "cod",
              <FaMoneyBillWave />,
              "Cash on Delivery",
            )}
          </div>
          <button
            onClick={() => navigate("/orders")}
            className="mt-8 w-full rounded-md bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

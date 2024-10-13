import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { FaStripe, FaCcAmazonPay, FaMoneyBillWave } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone, MdPerson } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

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

  const { navigate, cartItems, getCartAmount, backendUrl, token } =
    useContext(ShopContext);

  useEffect(() => {
    if (!token) {
      // If there's no token, save the current cart to localStorage
      localStorage.setItem("tempCart", JSON.stringify(cartItems));
    }
  }, [token, cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    try {
      const address = {
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        country: formData.country,
      };

      const orderData = {
        items: cartItems,
        amount: getCartAmount(),
        address,
      };

      let endpoint;
      switch (method) {
        case "stripe":
          endpoint = "/api/order/placeOrderStripe";
          break;
        case "razorpay":
          endpoint = "/api/order/placeOrderRazorpay";
          break;
        default:
          endpoint = "/api/order/placeOrder";
      }

      const response = await axios.post(`${backendUrl}${endpoint}`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Order placed successfully");
        navigate("/orders");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order");
    }
  };

  const renderInputField = (type, name, placeholder, icon) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3.5 py-2 pl-10"
        required
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

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">
          Please Log In to Place an Order
        </h2>
        <p className="mb-4">
          Your cart items will be saved for after you log in.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex min-h-[80vh] flex-col justify-between gap-8 border-t pt-8 lg:flex-row"
    >
      {/* Left Side Section */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          {renderInputField("text", "firstName", "First Name", <MdPerson />)}
          {renderInputField("text", "lastName", "Last Name", <MdPerson />)}
        </div>
        {renderInputField("email", "email", "Email Address", <MdEmail />)}
        {renderInputField(
          "text",
          "streetAddress",
          "Street Address",
          <MdLocationOn />,
        )}
        <div className="flex gap-3">
          {renderInputField("text", "city", "City", <MdLocationOn />)}
          {renderInputField("text", "state", "State", <MdLocationOn />)}
        </div>
        <div className="flex gap-3">
          {renderInputField("text", "zipcode", "Zipcode", <MdLocationOn />)}
          {renderInputField("text", "country", "Country", <MdLocationOn />)}
        </div>
        {renderInputField(
          "tel",
          "contactNumber",
          "Contact Number",
          <MdPhone />,
        )}
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
            onClick={handlePlaceOrder}
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

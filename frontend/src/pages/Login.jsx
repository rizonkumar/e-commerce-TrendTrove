import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const {
    token,
    setToken,
    navigate,
    backendUrl,
    getUserCart,
    mergeGuestCartWithUserCart,
  } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = currentState === "Login" ? "login" : "register";
      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      const response = await axios.post(
        `${backendUrl}/api/user/${endpoint}`,
        payload,
      );

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);

        // Merge guest cart with user cart after successful login
        const guestCart = JSON.parse(localStorage.getItem("tempCart"));
        if (guestCart) {
          await mergeGuestCartWithUserCart(guestCart);
        } else {
          // If there's no guest cart, fetch the user's cart
          await getUserCart(token);
        }

        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src={assets.logo}
            alt="Forever Logo"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {currentState === "Login" ? "Login" : "Create Account"}
          </h2>
        </div>
        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          <div className="space-y-4">
            {currentState === "Sign Up" && (
              <div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Name"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email address"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            By continuing, you agree to Forever's{" "}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Privacy Policy
            </Link>
            .
          </div>

          <div>
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              {currentState === "Login" ? "LOGIN" : "CONTINUE"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          {currentState === "Login" ? (
            <p className="text-sm text-gray-600">
              New to Forever?{" "}
              <a
                href="#"
                onClick={() => setCurrentState("Sign Up")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </a>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Existing User?{" "}
              <a
                href="#"
                onClick={() => setCurrentState("Login")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

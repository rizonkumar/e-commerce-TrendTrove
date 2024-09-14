import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

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
            {currentState === "Login"
              ? "Sign in to your account"
              : "Create a new account"}
          </h2>
        </div>
        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          <div className="space-y-4">
            {currentState === "Sign Up" && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              {currentState === "Login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
          <a
            href="#"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {currentState === "Login" ? "Create Account" : "Login Here"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

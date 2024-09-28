import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken, navigate } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src={assets?.profile_icon}
          alt="profile-icon"
          className="h-5 w-5 cursor-pointer"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
          {token ? (
            <>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="mr-2" />
                My Profile
              </Link>
              <Link
                to="/orders"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaShoppingBag className="mr-2" />
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
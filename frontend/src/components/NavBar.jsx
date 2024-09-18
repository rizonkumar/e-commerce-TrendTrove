import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import {
  FaUser,
  FaShoppingBag,
  FaSignOutAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import { toast } from "react-toastify";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartTotal,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setVisible(false);
    // setCartItems({}); // even the cart it should be emoty but when i comment this i am getting error
    toast.success("Logged out successfully");
  };

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets?.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <FaSearch
          className="h-5 w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
        <ProfileDropdown />
        <Link to="/cart" className="relative">
          <img
            src={assets?.cart_icon}
            alt="cart-icon"
            className="w-5 min-w-5"
          />
          <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
            {getCartTotal()}
          </p>
        </Link>
        <FaBars
          className="h-5 w-5 cursor-pointer sm:hidden"
          onClick={toggleSidebar}
        />
      </div>
      {/* Sidebar menu for small screens */}
      <div
        className={`fixed bottom-0 right-0 top-0 z-50 w-full bg-white transition-all duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div
            className="flex cursor-pointer items-center justify-between border-b p-5"
            onClick={toggleSidebar}
          >
            <p className="text-lg">Menu</p>
            <FaTimes className="h-6 w-6" />
          </div>
          <NavLink onClick={toggleSidebar} to="/" className="px-5 py-4 text-lg">
            HOME
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/collection"
            className="px-5 py-4 text-lg"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/about"
            className="px-5 py-4 text-lg"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/contact"
            className="px-5 py-4 text-lg"
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/profile"
            className="flex items-center px-5 py-4 text-lg"
          >
            <FaUser className="mr-2" />
            My Profile
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/orders"
            className="flex items-center px-5 py-4 text-lg"
          >
            <FaShoppingBag className="mr-2" />
            Orders
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-5 py-4 text-left text-lg"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

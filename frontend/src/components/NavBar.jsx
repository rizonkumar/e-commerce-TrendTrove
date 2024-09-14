import { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets?.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets?.search_icon}
          className="w-5 cursor-pointer"
          alt="search-icon"
        />
        <div className="group relative">
          <img
            src={assets?.profile_icon}
            alt="profile-icon"
            className="cursor-pointer w-5"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets?.cart_icon}
            alt="cart-icon"
            className="w-5 min-w-5"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>
        <img
          src={assets?.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu-icon"
          onClick={toggleSidebar}
        />
      </div>
      {/* Sidebar menu for small screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full bg-white transition-all duration-300 ease-in-out z-50 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className="flex items-center gap-4 p-5 cursor-pointer border-b"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <p className="text-lg">Back</p>
          </div>
          <NavLink onClick={toggleSidebar} to="/" className="py-4 px-5 text-lg">
            HOME
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/collection"
            className="py-4 px-5 text-lg"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/about"
            className="py-4 px-5 text-lg"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={toggleSidebar}
            to="/contact"
            className="py-4 px-5 text-lg"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NavBar;

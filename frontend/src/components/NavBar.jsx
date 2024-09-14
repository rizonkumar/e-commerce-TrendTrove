import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch } = useContext(ShopContext);

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
        <img
          src={assets?.search_icon}
          className="w-5 cursor-pointer"
          alt="search-icon"
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <img
            src={assets?.profile_icon}
            alt="profile-icon"
            className="w-5 cursor-pointer"
          />
          <div className="dropdown-menu absolute right-0 hidden pt-4 group-hover:block">
            <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
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
          <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
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
        className={`fixed bottom-0 right-0 top-0 z-50 w-full bg-white transition-all duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div
            className="flex cursor-pointer items-center gap-4 border-b p-5"
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
        </div>
      </div>
    </div>
  );
};
export default NavBar;

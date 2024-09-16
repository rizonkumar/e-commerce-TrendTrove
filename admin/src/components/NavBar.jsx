import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { FaSignOutAlt, FaBars } from "react-icons/fa";

const NavBar = ({ setToken, toggleSidebar }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <img
              src={assets.logo}
              alt="logo"
              className="ml-2 h-8 w-auto sm:h-10 md:ml-0"
            />
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FaSignOutAlt className="-ml-0.5 mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

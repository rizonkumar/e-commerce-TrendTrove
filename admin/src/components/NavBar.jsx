import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const NavBar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
      <button
        onClick={handleLogout}
        className="rounded-full bg-gray-600 px-5 py-2 text-xs text-white transition-colors duration-300 hover:bg-gray-700 sm:px-7 sm:py-2 sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;

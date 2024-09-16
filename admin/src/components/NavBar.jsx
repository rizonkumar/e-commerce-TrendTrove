import { assets } from "../assets/assets";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
      <button className="rounded-full bg-gray-600 px-5 py-2 text-xs text-white sm:px-7 sm:py-2 sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default NavBar;

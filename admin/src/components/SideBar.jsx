import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
  return (
    <div className="min-h-screen w-[18%] border-r-2">
      <div className="flex flex-col gap-4 pl-[20%] pt-6 text-[15px]">
        <NavLink
          to="/add"
          className="border-4-0 rounded- flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2"
        >
          <img src={assets.add_icon} alt="add-icon" className="h-5 w-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/lists"
          className="border-4-0 rounded- flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2"
        >
          <img src={assets.order_icon} alt="order-icon" className="h-5 w-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="border-4-0 rounded- flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2"
        >
          <img src={assets.order_icon} alt="add-icon" className="h-5 w-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;

import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaList, FaShoppingBag, FaTimes } from "react-icons/fa";

const SideBar = ({ isOpen, closeSidebar }) => {
  const navItems = [
    { to: "/add", icon: FaPlusCircle, text: "Add Items" },
    { to: "/lists", icon: FaList, text: "List Items" },
    { to: "/orders", icon: FaShoppingBag, text: "Orders" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-30 w-64 overflow-y-auto bg-white transition duration-200 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="p-6">
        <button
          onClick={closeSidebar}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 md:hidden"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <nav className="mt-8 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;

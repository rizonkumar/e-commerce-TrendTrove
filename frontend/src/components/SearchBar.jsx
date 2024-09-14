import { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const inputRef = useRef(null);

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  useEffect(() => {
    if (showSearch && visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch, visible]);

  if (!showSearch || !visible) return null;

  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border-2 border-gray-300 py-2 pl-10 pr-10 text-sm transition-colors focus:border-blue-500 focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
          <button
            onClick={() => setShowSearch(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

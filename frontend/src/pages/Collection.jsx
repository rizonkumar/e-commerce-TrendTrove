import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // Filter Products based on selected category and sub category
  const toggleCategory = (event) => {
    console.log("Selected value:", event.target.value);
    if (category.includes(event.target.value)) {
      setCategory((prev) => {
        const newCategory = prev.filter((item) => item !== event.target.value);
        return newCategory;
      });
    } else {
      setCategory((prev) => {
        const newCategory = [...prev, event.target.value];
        return newCategory;
      });
    }
  };

  const toggleSubCategory = (event) => {
    if (subCategory.includes(event.target.value)) {
      setSubCategory((prev) => {
        const newSubCategory = prev.filter(
          (item) => item !== event.target.value,
        );
        return newSubCategory;
      });
    } else {
      setSubCategory((prev) => {
        const newSubCategory = [...prev, event.target.value];
        return newSubCategory;
      });
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory),
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col gap-6 border-t pt-10 lg:flex-row">
      {/* Filter Options */}
      <div className="min-w-60 lg:sticky lg:top-20 lg:self-start">
        <button
          className="flex w-full items-center justify-between bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span className="font-medium">FILTERS</span>
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets?.dropdown_icon}
            alt="dropdown-icon"
          />
        </button>
        {/* Category Filter */}
        <div
          className={`mt-6 border border-gray-300 py-3 pl-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleCategory}
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleCategory}
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleCategory}
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Sub Category */}
        <div
          className={`my-5 border border-gray-300 py-3 pl-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onChange={toggleSubCategory}
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side Section */}
      <div className="flex-1">
        <div className="mb-4 flex justify-between text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            className="rounded border-2 border-gray-300 px-2 text-sm"
            onChange={(event) => setSortType(event.target.value)}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>
        {/* Map Products to Collection */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
            {filterProducts.map((product, index) => (
              <ProductItem
                key={product._id || index}
                name={product.name}
                id={product._id}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              No products found
            </h3>
            <p className="mx-auto max-w-md text-gray-600">
              We couldn't find any products matching your criteria. Try
              adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Collection;

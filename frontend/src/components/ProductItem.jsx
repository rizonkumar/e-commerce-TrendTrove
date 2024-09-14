import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-64 object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
          {name}
        </h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;

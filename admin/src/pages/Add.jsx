import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    sizes: [],
    bestseller: false,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSize = (size) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (e, imageField) => {
    setProductData((prev) => ({
      ...prev,
      [imageField]: e.target.files[0],
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "sizes") {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (key.startsWith("image") && productData[key]) {
          formData.append(key, productData[key]);
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        setProductData({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subCategory: "Topwear",
          sizes: [],
          bestseller: false,
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product");
    }
  };

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="bg-indigo-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Add New Product</h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-6 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Upload Product Images
          </label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["image1", "image2", "image3", "image4"].map((imageField) => (
              <label
                key={imageField}
                htmlFor={imageField}
                className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition duration-300 ease-in-out hover:bg-gray-50"
              >
                {productData[imageField] ? (
                  <img
                    src={URL.createObjectURL(productData[imageField])}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <FaCloudUploadAlt className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Upload</p>
                  </div>
                )}
                <input
                  type="file"
                  id={imageField}
                  onChange={(e) => handleImageChange(e, imageField)}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter product description"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="subCategory"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Product SubCategory
            </label>
            <select
              id="subCategory"
              name="subCategory"
              value={productData.subCategory}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Sizes
          </label>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  productData.sizes.includes(size)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="bestseller"
            name="bestseller"
            type="checkbox"
            checked={productData.bestseller}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="bestseller"
            className="ml-2 block text-sm text-gray-900"
          >
            Add to bestseller
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;

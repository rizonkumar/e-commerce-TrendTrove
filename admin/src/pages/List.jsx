import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaStar, FaTags, FaTimes } from "react-icons/fa";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${backendUrl}/api/product/remove`,
          {
            headers: { token },
            data: { id },
          },
        );
        if (response.data.success) {
          setProducts(products.filter((product) => product._id !== id));
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product, sizes: product.sizes.join(",") });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", editingProduct._id.toString());

      Object.keys(editingProduct).forEach((key) => {
        if (key !== "image") {
          formData.append(key, editingProduct[key]);
        }
      });

      // Handle file uploads
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append(`image${i + 1}`, fileInput.files[i]);
        }
      }

      const response = await axios.put(
        `${backendUrl}/api/product/update`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);
      if (response.data.success) {
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id ? response.data.product : p,
          ),
        );
        setEditingProduct(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        "Failed to update product: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Product List</h1>
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
            <div className="mt-3">
              <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                Edit Product
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                />
                <textarea
                  className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  placeholder="Category"
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
                  value={editingProduct.subCategory}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      subCategory: e.target.value,
                    })
                  }
                  placeholder="Sub Category"
                />
                <input
                  className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
                  value={editingProduct.sizes}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sizes: e.target.value,
                    })
                  }
                  placeholder="Sizes (comma-separated)"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingProduct.bestseller}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        bestseller: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label>Bestseller</label>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Images
                  </label>
                  <input
                    type="file"
                    className="w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    multiple
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="rounded-md bg-gray-300 px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="relative h-48">
              <img
                src={product.image[0] || "https://via.placeholder.com/300"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.bestseller && (
                <div className="absolute right-2 top-2 rounded bg-yellow-400 p-1 text-white">
                  <FaStar className="mr-1 inline-block" />
                  Bestseller
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="mb-2 text-gray-600">
                {product.description.substring(0, 100)}...
              </p>
              <p className="mb-2 font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <div className="mb-2 flex flex-wrap">
                <span className="mb-2 mr-2 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800">
                  <FaTags className="mr-1 inline-block" />
                  {product.category}
                </span>
                <span className="mb-2 mr-2 rounded-full bg-green-100 px-2 py-1 text-sm text-green-800">
                  {product.subCategory}
                </span>
              </div>
              <div className="mb-2 flex flex-wrap">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="mb-2 mr-2 rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700"
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="mb-2 text-sm text-gray-500">
                Added: {new Date(product.date).toLocaleDateString()}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleEdit(product)}
                  className="rounded bg-indigo-500 px-3 py-1 text-white transition duration-300 hover:bg-indigo-600"
                >
                  <FaEdit className="mr-1 inline-block" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="rounded bg-red-500 px-3 py-1 text-white transition duration-300 hover:bg-red-600"
                >
                  <FaTrash className="mr-1 inline-block" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

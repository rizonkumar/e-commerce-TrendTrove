import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    };
    fetchProductData();
  }, [productId, products]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please Select Product Size");
      return;
    }
    addToCart(productData._id, size, quantity);
    toast.success("Item added to cart");
  };

  if (!productData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Product Image */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="scrollbar-thin scrollbar-thumb-gray-300 flex gap-2 overflow-x-auto sm:h-[500px] sm:w-1/5 sm:flex-col sm:overflow-y-auto">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt={`${productData.name} view ${index + 1}`}
                className="h-20 w-20 cursor-pointer object-cover transition-opacity duration-300 hover:opacity-80"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="sm:w-4/5">
            <img
              src={image}
              alt={productData.name}
              className="h-auto w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-semibold">{productData.name}</h1>
          <div className="mb-4 flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                alt={`star-${index + 1}`}
                className="h-4 w-4"
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">(721 reviews)</span>
          </div>
          <p className="mb-4 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mb-6 text-gray-700">{productData.description}</p>
          <div className="mb-6">
            <p className="mb-2 font-medium">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`rounded-md px-4 py-2 text-sm ${
                    item === size
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } transition-colors duration-300`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center rounded border">
              <button
                className="bg-gray-100 px-3 py-1 hover:bg-gray-200"
                onClick={decrementQuantity}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 border-x py-1 text-center"
              />
              <button
                className="bg-gray-100 px-3 py-1 hover:bg-gray-200"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-md bg-black px-8 py-3 text-white transition-colors duration-300 hover:bg-gray-800 sm:w-auto"
          >
            ADD TO CART
          </button>
          <hr className="my-8" />
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ 100% Original Product</p>
            <p>✓ Cash on Delivery available</p>
            <p>✓ Easy 30-day returns and exchanges</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className="mt-16">
        <div className="flex border-b">
          <button className="border-b-2 border-black px-6 py-3 text-sm font-medium">
            Description
          </button>
          <button className="px-6 py-3 text-sm text-gray-600 transition-colors duration-300 hover:text-black">
            Reviews (721)
          </button>
        </div>
        <div className="space-y-4 py-6 text-gray-700">
          <p>
            Experience unparalleled comfort and style with our{" "}
            {productData.name}. Crafted from premium materials, this piece
            combines fashion-forward design with everyday practicality.
          </p>
          <p>
            Whether you're heading to the office, meeting friends for brunch, or
            enjoying a casual day out, this versatile item adapts effortlessly
            to any occasion. Its thoughtful design ensures a perfect fit and
            long-lasting durability.
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>High-quality, breathable fabric for all-day comfort</li>
            <li>Stylish design that complements various outfits</li>
            <li>Easy care instructions for long-lasting wear</li>
            <li>Available in multiple sizes to ensure the perfect fit</li>
          </ul>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct
        category={productData?.category}
        subCategory={productData?.subCategory}
      />
    </div>
  );
};

export default Product;

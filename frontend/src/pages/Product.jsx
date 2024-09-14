import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
      {/* Product Details */}
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
        {/* Product Image */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex w-full flex-col justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt={productData.name}
                className="w-[24%] flex-shrink-0 cursor-pointer sm:mb-3 sm:w-full"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="h-auto w-full" />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            <img src={assets.star_icon} alt="star-1" className="5 w-3" />
            <img src={assets.star_icon} alt="star-2" className="5 w-3" />
            <img src={assets.star_icon} alt="star-3" className="5 w-3" />
            <img src={assets.star_icon} alt="star-4" className="5 w-3" />
            <img src={assets.star_dull_icon} alt="star-5" className="5 w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-3 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="my-8 flex flex-col gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 ${item === size ? "border-orange-500 bg-gray-200 text-gray-900" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="active:bg-gray-700-lg rounded bg-black px-8 py-3 text-sm text-white">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange within 30 days</p>
          </div>
        </div>
      </div>
      {/* Description and Reviews Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {/* i have attached a response (assets.js file) of one of the id can we increase deciption by any changce as already we have add descripotion above, I need below also but no the same data */}
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa,
            quibusdam repudiandae incidunt dolore est laborum officia non
            explicabo dignissimos? Nulla, maxime? Excepturi modi atque
            necessitatibus delectus non aspernatur quisquam dolorem quasi earum
            laudantium minima dicta neque, qui corporis inventore
            exercitationem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut id
            numquam sit deserunt illo? Amet molestiae ut eaque. Minima,
            mollitia.
          </p>
        </div>
      </div>
      {/* Diplsay Related Products Section */}
      <RelatedProduct
        category={productData?.category}
        subCategory={productData?.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((product) => product.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="container mx-auto px-4 my-16">
      <div className="text-center mb-12">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-gray-600">
          Discover our most popular items that have won the hearts of our
          customers. These best-sellers combine style, quality, and value,
          making them the perfect choice for any wardrobe.
        </p>
      </div>

      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
          {bestSeller.map((product, index) => (
            <ProductItem
              key={product._id || index}
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No best sellers available at the moment.
        </p>
      )}
    </div>
  );
};

export default BestSeller;

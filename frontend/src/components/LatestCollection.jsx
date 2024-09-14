import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="container mx-auto px-4 my-16">
      <div className="text-center mb-12">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-gray-600">
          Discover our curated selection of the season's most exciting styles.
          From trendsetting designs to timeless classics, our latest collections
          offer something for every taste and occasion.
        </p>
      </div>

      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
          {latestProducts.map((product, index) => (
            <ProductItem
              key={product._id || index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No latest collections available at the moment.
          </p>
          <p className="mt-2 text-gray-500">
            Check back soon for new arrivals!
          </p>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;

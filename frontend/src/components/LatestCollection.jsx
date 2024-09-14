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
    <div className="container mx-auto my-16 px-4">
      <div className="mb-12 text-center">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
          Discover our curated selection of the season's most exciting styles.
          From trendsetting designs to timeless classics, our latest collections
          offer something for every taste and occasion.
        </p>
      </div>

      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
        <div className="py-12 text-center">
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

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      const relatedProducts = products
        .filter(
          (item) =>
            item.category === category && item.subCategory === subCategory,
        )
        .slice(0, 5);
      setRelated(relatedProducts);
    } else {
      setRelated([]);
    }
  }, [products, category, subCategory]);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="my-24">
      <div className="mb-8 text-center">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      {related.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No related products found.</p>
      )}
    </section>
  );
};

export default RelatedProduct;

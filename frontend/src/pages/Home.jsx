import { useContext } from "react";
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewLetterBox from "../components/NewLetterBox";
import OurPolicy from "../components/OurPolicy";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { products } = useContext(ShopContext);

  return (
    <div>
      <Hero />
      <LatestCollection products={products} />
      <BestSeller products={products} />
      <OurPolicy />
      <NewLetterBox />
    </div>
  );
};

export default Home;

const { createContext } = require("react");
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 8;

  const value = { products, currency, delivery_fee };
  console.log("Value", value);

  return (
    <ShopContext.Provider value={value}>{props.childern}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 8;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  const addToCart = async (itemId, size, quantity) => {
    if (!size) {
      toast.error("Please Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += quantity;
      } else {
        cartData[itemId][size] = quantity;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add-product",
          {
            itemId,
            size,
            quantity,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to add to cart");
      }
    }
  };

  const getCartTotal = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update-cart",
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemsInfo = products.find((product) => product._id === items);
      if (itemsInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += cartItems[items][item] * itemsInfo.price;
            }
          } catch (error) {
            console.error("Error calculating cart amount:", error);
          }
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async (productIds = []) => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: productIds.length > 0 ? { ids: productIds.join(",") } : {},
      });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get-user-cart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
        const productIds = Object.keys(response.data.cartData);
        await getProductsData(productIds);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getProductsData();
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    cartItems,
    isLoggedIn,
    backendUrl,
    setSearch,
    setShowSearch,
    addToCart,
    getCartTotal,
    updateQuantity,
    getCartAmount,
    navigate,
    setIsLoggedIn,
    token,
    setToken,
    getProductsData,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Home from "./pages/Collection";
import Home from "./pages/About";
import Home from "./pages/Orders";
import Home from "./pages/Contact";
import Home from "./pages/Product";
import Home from "./pages/Cart";
import Home from "./pages/Login";
import Home from "./pages/PlaceOrder";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;

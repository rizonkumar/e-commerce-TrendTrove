import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";

const backendUrl = "http://localhost:5000";
const App = () => {
  const [token, setToken] = useState("");
  return (
    <div className="min-h-screen bg-gray-50">
      {token === "" ? (
        <Login />
      ) : (
        <>
          <NavBar />
          <hr className="" />
          <div className="flex w-full">
            <SideBar />
            <div className="ml-[max(5vw, 25px)] mx-auto my-8 w-[70%] text-base text-gray-600">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/lists" element={<List />} />
                <Route path="/orders" element={<Order />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

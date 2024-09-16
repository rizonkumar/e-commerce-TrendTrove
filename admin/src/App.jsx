import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex h-screen flex-col">
          <NavBar setToken={setToken} toggleSidebar={toggleSidebar} />
          <div className="flex flex-1 overflow-hidden">
            <SideBar
              isOpen={isSidebarOpen}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-4">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/lists" element={<List token={token} />} />
                <Route path="/orders" element={<Order token={token} />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

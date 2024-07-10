"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/Components/Header/Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import ProtectedRoute from "@/Components/Protected/ProtectedRoute";

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <ProtectedRoute>
       <div className="app">
      <Header handleToggle={handleToggle} />
      <div className="hero">
        <Sidebar toggle={toggle} />
        <div className="content">{children}</div>
      </div>
      <Toaster />
    </div>
    </ProtectedRoute>
   
  );
};

export default Layout;

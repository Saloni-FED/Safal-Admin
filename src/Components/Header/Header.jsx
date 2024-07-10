"use client";
import React, { useContext, useEffect, useRef } from "react";
import "./Header.css";
import { AppContext } from "@/Context/AppContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; 
import logout from "../../assests/safal_logout.webp"
import { auth } from "../../firebase/firebaseConfig";
import Image from "next/image";
// import logout from "../../assets/images/logout.png"
const Header = () => {
  const { sidebar, isOpen, removeSidebar } = useContext(AppContext);
  const toggle = useRef(null);
  const router = useRouter()
  const toggleHandler = () => {
    if (toggle.current && sidebar.current) {
      // Add guards to ensure refs are not null
      if (isOpen) {
        toggle.current.classList.add("toggle");
        toggle.current.classList.remove("cross");
        sidebar.current.classList.add("side");
        sidebar.current.classList.remove("sideblur");
      } else {
        toggle.current.classList.add("cross");
        toggle.current.classList.remove("toggle");
        sidebar.current.classList.remove("side");
        sidebar.current.classList.add("sideblur");
      }
    }
  };

  useEffect(() => {
    toggleHandler();
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="header">
      <a href="/">
        <h1>Safal Admin Panel</h1>
      </a>
      <button className="logout" onClick={handleLogout} style={{cursor:"ponter"}}>
        {/* <div> */}
          <Image src={logout} alt="logout" className="img" style={{width:"40px", height:"40px"}}/>
        {/* </div> */}
        <p>Log Out</p>
      </button>
      <button onClick={removeSidebar} className={isOpen ? "toggle" : "cross"} style={{cursor:"pointer"}}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
};

export default Header;

"use client";
import React, { useState } from "react";
import "./Header.css";

import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebaseConfig";
import Image from "next/image";
// import logout from "../../assets/images/logout.png";
const Header = ({handleToggle, toggle}) => {
  
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
        <h1>Safal Admin</h1>
      </a>

      <button className="logout" onClick={handleLogout}>
        {/* <div> */}
        {/* <Image
          src={logout}
          alt="logout"
          width={35}
          height={35}
          className="img"
        /> */}
        {/* </div> */}
        Log Out
      </button>

      <button onClick={handleToggle} className="menu_hidden">Show</button>
    </div>
  );
};

export default Header;

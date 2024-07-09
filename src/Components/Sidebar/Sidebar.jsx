"use client";
import React, { useState, useContext } from "react";
import "./Sidebar.css";
import Link from "next/link";
import Image from "next/image";
// import { AppContext } from "@/Context/AppContext";

// images
// import author from "../../assets/images/author.png";
// import blog from "../../assets/images/blog.png";
// import help from "../../assets/images/help.png";
// import login from "../../assets/images/login.png";
// import logout from "../../assets/images/logout.png";
// import order from "../../assets/images/order.png";
// import partner from "../../assets/images/partner.png";
// import tag from "../../assets/images/tag.png";
// import vendor from "../../assets/images/vendor.png";
// import wallet from "../../assets/images/wallet.png";

const Sidebar = ({ toggle }) => {
  // const { sidebar, removeSidebar } = useContext(AppContext);
  const [clicked, setClicked] = useState("");
  // onClick={removeSidebar} ref={sidebar}
  return (
    
    <div className={toggle ?`sidebar side` : "sidebar sideblur"}>
      <div>
        <h2>Admin Panels</h2>

        <div
          onClick={() => setClicked("c")}
          id={clicked === "ac" ? "sideClicked" : ""}
        >
          {/* <Image src={tag} alt="Graphics" /> */}
          <Link href="/entry">Contacts</Link>
        </div>
        <div
          onClick={() => setClicked("")}
          id={clicked === "aus" ? "sideClicked" : ""}
        >
          {/* <Image src={tag} alt="Coupons" /> */}
          <Link href="/unlistedshares">Unlisted Shares</Link>
        </div>
        <div
          onClick={() => setClicked("")}
          id={clicked === "aus" ? "sideClicked" : ""}
        >
          {/* <Image src={tag} alt="Coupons" /> */}
          <Link href="/unlistedshares">FAQ</Link>
        </div>
        <div
          onClick={() => setClicked("")}
          id={clicked === "aus" ? "sideClicked" : ""}
        >
          {/* <Image src={tag} alt="Coupons" /> */}
          <Link href="/unlistedshares">Sub Broker</Link>
        </div>
        <div
          onClick={() => setClicked("")}
          id={clicked === "aus" ? "sideClicked" : ""}
        >
          {/* <Image src={tag} alt="Coupons" /> */}
          <Link href="/unlistedshares">Bitcoins</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

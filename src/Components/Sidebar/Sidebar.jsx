"use client";
import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { AppContext } from "@/Context/AppContext";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import contact from "../../assests/admin_mob.webp";
import subroker from "../../assests/admin_subbroker.webp"
import img from "../../assests/img.webp"

import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ toggle }) => {
  const [clicked, setClicked] = useState("contacts");

  const { sidebar, isOpen, removeSidebar } = useContext(AppContext);
  const handleClick = (id) => {
    setClicked(id); // Set the clicked state to the id of the clicked link
  };

  return (
    <div className={isOpen ? "sidebar side" : "sidebar sideblur"}>
      <div>
        <h2>Admin Panels</h2>

        <div
          onClick={() => handleClick("contacts")}
          className={clicked === "contacts" ? "sideClicked" : ""}
        >
          <Image src={contact} alt="Partners" />
          <Link href="/entry">Contacts</Link>
        </div>

        <div
          onClick={() => handleClick("unlistedshares")}
          className={clicked === "unlistedshares" ? "sideClicked" : ""}
        >
          <Image src={img} alt="Partners" />
          <Link href="/unlistedshares">Unlisted Shares</Link>
        </div>

        <div
          onClick={() => handleClick("subbroker")}
          className={clicked === "subbroker" ? "sideClicked" : ""}
        >
          <Image src={img} alt="Partners" />
          <Link href="/subbroker">Sub Broker</Link>
        </div>

       
      </div>
    </div>
  );
};

export default Sidebar;

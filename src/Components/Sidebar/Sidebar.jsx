"use client";
import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { AppContext } from "@/Context/AppContext";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import contact from "../../assests/admin_mob.webp";
import subroker from "../../assests/admin_subbroker.webp"
import img from "../../assests/img.webp"
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ toggle }) => {
  const router = useRouter()
  const [clicked, setClicked] = useState("entry");

  const { sidebar, isOpen, removeSidebar } = useContext(AppContext);
  const handleClick = (id) => {
    console.log(id)
    setClicked(id); // Set the clicked state to the id of the clicked link
    router.push(`/${id}`)
  };

  return (
    <div className={isOpen ? "sidebar side" : "sidebar sideblur"}>
      <div>
        {/* <h2>Admin Layout</h2> */}

        <div
          onClick={() => handleClick("entry")}
          className={clicked === "entry" ? "sideClicked" : ""}
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
        <div
          onClick={() => handleClick("unlistedsharesquestions")}
          className={clicked === "unlistedsharesquestions" ? "sideClicked" : ""}
        >
          <Image src={img} alt="Partners" />
          <Link href="/unlistedsharesquestions">Unlisted Shares Contact</Link>
        </div>
        <div
          onClick={() => handleClick("insurance")}
          className={clicked === "insurance" ? "sideClicked" : ""}
        >
          <Image src={img} alt="Partners" />
          <Link href="/insurance">Insurance</Link>
        </div>
        <div
          onClick={() => handleClick("mutual")}
          className={clicked === "mutual" ? "sideClicked" : ""}
        >
          <Image src={img} alt="Partners" />
          <Link href="/mutual">Mutual Funds</Link>
        </div>

       
      </div>
    </div>
  );
};

export default Sidebar;

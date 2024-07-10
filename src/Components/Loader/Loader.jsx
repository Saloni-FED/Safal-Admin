"use client";
import React, { useState } from "react";
import styles from "./Loader.module.css";
import Image from "next/image";
import load from "../../../src/assests/load.png";

const Loader = ({ func }) => {
  const [isLoading, setIsLoading] = useState();

  const clickHandler = async () => {
    try {
      setIsLoading(true);
      await func();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <Image
      height={40}
      width={40}
      style={{ cursor: "pointer" }}
      onClick={clickHandler}
      src={load}
      alt="load"
      className={isLoading ? styles.loader : "l"}
    />
  );
};

export default Loader;

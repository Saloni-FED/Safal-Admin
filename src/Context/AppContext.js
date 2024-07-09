"use client";
import { Button } from "@mui/material";
import { createContext, useRef, useState } from "react";
import { styled } from "@mui/material/styles";

// Step1
export const AppContext = createContext();

function AppContextProvider({ children }) {
  const sidebar = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [headTitle, setHeadTitle] = useState("Dashboard");
  const [mode, setMode] = useState("create");
  const [blog, setBlog] = useState({})
  
  const removeSidebar = () => {
    setIsOpen(!isOpen);
  };
  const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f496ac",
    color: "white",
    margin: "1rem",
    "&:hover": {
      backgroundColor: "#fe7998",
      borderColor: "#fe7998",
      color: "white",
    },
  }));

  const value = {
    sidebar,
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    headTitle,
    setHeadTitle,
    mode,
    setMode,
    removeSidebar,
    blog,
    setBlog,
    StyledButton,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;

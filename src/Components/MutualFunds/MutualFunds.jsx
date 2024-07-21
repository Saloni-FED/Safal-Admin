"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";
import "./MutualFunds.css";
import load from "../../../src/assests/load.png";
import { Button, Select, MenuItem } from "@mui/material";
import Loader from "../Loader/Loader.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const MutualFunds = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  const [isLoading, setIsLoading] = useState(true);

  const fetchPartners = async () => {
    try {
      const contactsRef = collection(db, "mutualFunds");
      const snapshot = await getDocs(contactsRef);
      const contactsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsLoading(false);
      setContacts(contactsList);
      setFilteredPartners(contactsList);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact?.name?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPartners(filtered);
    setPage(0);
  }, [searchInput, contacts]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <div className="showPartnersPage">
        <div className="showPartnersHeader">
          <div className="search">
            <h1 className="head">Mutual Funds </h1>
            <div className="searchLayout">
              <div className="searchBar">
                <input
                  placeholder="Search.."
                  value={searchInput} // Bind input value to searchQuery state
                  onChange={(e) => setSearchInput(e.target.value)} // Update searchQuery state on input change
                />
              </div>

              <Loader func={fetchPartners} />
            </div>
          </div>
        </div>
        <div className="showPartners">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((partner, index) => (
                  <tr key={partner.id}>
                    <td>{partner.name}</td>
                    <td>{partner.subject}</td>
                    <td>{partner.email}</td>
                    <td>{partner.phoneNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination">
            <Button
              sx={{ width: "6rem" }}
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              sx={{ width: "6rem" }}
              onClick={() => handleChangePage(page + 1)}
              disabled={
                page >= Math.ceil(filteredPartners.length / rowsPerPage) - 1
              }
            >
              Next
            </Button>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              style={{ marginLeft: "1rem", width: "6rem" }}
              sx={{ width: "10rem" }}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size} sx={{ width: "10rem" }}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFunds;

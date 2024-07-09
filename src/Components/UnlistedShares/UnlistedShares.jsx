"use client";
import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { db, storage } from "../../firebase/firebaseConfig";
// import "react-toastify/dist/ReactToastify.css";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import load from "../../../src/assests/load.png";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
// import load from "../../../assets/images/load.png";
// import { Image } from "next/image";

import "firebase/firestore";
import { useRouter } from "next/navigation";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import addIcon from "../../assests/addIcon.png";
import "./UnlistedShares.css";

const UnlistedShares = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [makeups, setMakeups] = useState([]);
  const [show, setShow] = useState([]);
  const [divId, setDivId] = useState("button-0");
  const [makeupDialogOpen, setMakeupDialogOpen] = useState(false);
  const [newMakeup, setNewMakeup] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [archiveOrUpload, setArchiveOrUpload] = useState("upload");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [archive, setArchive] = useState([]);

  //   Unlisted Shares
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unlistedShares, setUnlistedShares] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter

  const fetchMakeupsCategories = async () => {
    try {
      const makeupsRef = query(
        collection(db, "adminSubBroker"),
        orderBy("createdAt", "desc")
      );
      const makeupSnapshot = await getDocs(makeupsRef);
      const makeupsData = makeupSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUnlistedShares(makeupsData);
      //   setMakeupsCategories(makeupsData);
      console.log(makeupsData);
    } catch (error) {
      console.error("Error fetching makeups:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching makeups... useEffect all makeups page");
    fetchMakeupsCategories();
  }, []);

  const handleSetArchiveImage = (url) => {
    setImagePreview(url);
    setOpenImageDialog(false);
  };

  const handleImageUpload = async (file, mid) => {
    const storageRef = ref(storage, `/images/${mid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleImageUploadToArchive = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `archives/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleAddMakeup = async () => {
    if (name.trim() === "" || price.trim() === "") return;
    const mid = `MID${Date.now()}`;
    setMakeupDialogOpen(false);

    try {
      let imageURL = "";
      if (image) {
        imageURL = await handleImageUpload(image, mid);
      } else {
        imageURL = imagePreview;
      }

      if (image) {
        const archiveURL = await handleImageUploadToArchive(image);
        const archiveRef = collection(db, "archive");
        await addDoc(archiveRef, {
          ImageUrl: archiveURL,
        });
      }

      const docRef = await setDoc(doc(db, "adminSubBroker", mid), {
        name: name,
        price: price,

        createdAt: serverTimestamp(),
        imageUrl: imageURL,
      });

      // fetchMakeups();
      // setDivId("button-0");
      // console.log(makeups);
      // toast.success("Makeup added Successfully");

      fetchMakeupsCategories();
      setDivId("button-0");

      // console.log(makeupsData);
      if (unlistedShares) {
        toast.success("Shares added Successfully");
      }
      setName("");
      setPrice("");
      setImage(null);
      setImagePreview("");
    } catch (error) {
      toast.error("Error adding Makeup ");
      console.error("Error adding makeup:", error);
    }
  };
  // console.log(makeups)

  //   const handleEditMakeup = async () => {
  //     if (parseInt(minAge) > parseInt(maxAge)) {
  //       toast.error("Minimum age cannot be greater than maximum age.");
  //       return;
  //     }
  //     setMakeupDialogOpen(false);
  //     let imageURL = "";
  //     if (image) {
  //       imageURL = await handleImageUpload(image, editId);
  //     } else {
  //       imageURL = imagePreview;
  //     }
  //     if (image) {
  //       const archiveURL = await handleImageUploadToArchive(image);
  //       const archiveRef = collection(db, "archive");
  //       await addDoc(archiveRef, {
  //         ImageUrl: archiveURL,
  //       });
  //     }
  //     try {
  //       const ref = doc(db, "makeups", editId);
  //       await updateDoc(ref, {
  //         name: newMakeup,
  //         discountedPrice: disPrice,
  //         duration: duration,
  //         category: newCategory,
  //         gender: gender,
  //         minAge: minAge,
  //         maxAge: maxAge,
  //         createdAt: serverTimestamp(),
  //         imageUrl: imageURL,
  //       });

  //       fetchMakeups();
  //       setDivId("button-0");
  //       toast.success("Makeup Edited Successfully");
  //       setNewMakeup("");
  //       setDisPrice("");
  //       setImagePreview("");
  //       setImage(null);
  //       setDuration("");
  //       setNewCategory("");
  //       setGender(""), setMinAge("");
  //       setMaxAge("");
  //       setIsEdit(false);
  //     } catch (error) {
  //       toast.error("Error editin Makeup");
  //       console.error("Error editing category:", error);
  //     }
  //   };

  const filteredMakeups = unlistedShares.filter((makeup) =>
    makeup.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMakeup = async (id) => {
    try {
      const ref = doc(db, "makeups", id);
      await deleteDoc(ref);
      setMakeupDialogOpen(false);
      toast.success("Makeup Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Makeup");
      console.error("Error deleting category:", error);
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleCloseDialog = () => {
    setOpenImageDialog(false);
  };
  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const archiveRef = collection(db, "archive");
        const querySnapshot = await getDocs(archiveRef);
        const archiveData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArchive(archiveData);
      } catch (error) {
        console.error("Error fetching archive:", error);
      }
    };
    fetchArchive();
  }, []);

  const handleArchiveImageUpload = async (file) => {
    const storageRef = ref(storage, `/adminPanel/archive/images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSaveImageToArchive = async (file) => {
    try {
      const imageURL = await handleArchiveImageUpload(file);
      const archiveRef = collection(db, "archive");
      await addDoc(archiveRef, {
        ImageUrl: imageURL,
      });
      console.log(imageURL);
      setArchive((prevArchive) => [...prevArchive, { Image: imageURL }]);
      console.log(archive);
      toast.success("Image saved to archive successfully!");
    } catch (error) {
      console.error("Error saving image to archive:", error);
      toast.error("Error saving image to archive. Please try again.");
    }
  };

  const handleImageArchiveChange = (e) => {
    const file = e.target.files[0];
    handleSaveImageToArchive(file);
  };

  // console.log(maxAge, "Maxmum Age");  console.log(minAge, "Minimum Age");

  // console.log(makeupsCategories)
  // console.log(show);
  return (
    <div className="makeupsPage">
      <div className="makeupsHeader">
        <div className="search">
          <h1 className="head">Unlisted Shares</h1>
          <input
            placeholder="Search.."
            className="contact_input"
            value={searchQuery} // Bind input value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          />
        </div>

        <div
          className=""
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingRight: "3rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            sx={{
              width: "10rem",
              marginBottom: "0.5rem",
            }}
            id="newBtn"
            variant="outlined"
            onClick={() => {
              setMakeupDialogOpen(true);
            }}
          >
            Add Shares
          </Button>
          <Image
            src={load}
            width={20}
            height={20}
            style={{ height: "40px", width: "40px" }}
            alt={load}
          />
          {/* <div style={{ display: "flex", justifyContent: "end" }}> */}
          {/* <Image
              height={40}
              width={40}
              style={{ cursor: "pointer", marginTop: "", marginLeft: "5px" }}
              onClick={fetchMakeups}
              src={load}
              alt="load"
            /> */}
          {/* </div> */}
        </div>
      </div>
      <div className="makeups">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Created at</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredMakeups
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((makeup, index) => (
                <tr key={makeup.id}>
                  <td>{makeup.name}</td>
                  <td>
                    <img src={makeup.imageUrl} style={{ width: "50px" }} />
                  </td>
                  <td>{makeup.price}</td>
                  {new Date(makeup.createdAt.toDate()).toLocaleString() && (
                    <td>
                      {new Date(makeup.createdAt.toDate()).toLocaleString()}
                    </td>
                  )}
                  {/* <td data-label="Select">
                    <Button
                      onClick={() => {
                        setMakeupDialogOpen(true);
                        setIsEdit(true);
                        setEditId(makeup.id);
                        setNewCategory(makeup.category);
                        setNewMakeup(makeup.name);
                        setDuration(makeup.duration);
                        setImagePreview(makeup.imageUrl);
                        
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeleteMakeup(makeup.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td> */}
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
              page >= Math.ceil(filteredMakeups.length / rowsPerPage) - 1
            }
            variant="outlined"
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
      <Dialog open={makeupDialogOpen}>
        <DialogTitle>Add New Shares</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="filled"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
          />

          <TextField
            variant="filled"
            sx={{ mt: 2 }}
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputProps={{
              min: 0,
              max: 100,
              onKeyDown: (event) => {
                if (
                  event.key === "-" ||
                  event.key === "+" ||
                  event.key === "e" ||
                  event.key === "E"
                ) {
                  event.preventDefault();
                }
              },
            }}
          />

          <span className="uploadImg1" onClick={() => setOpenImageDialog(true)}>
            {imagePreview ? (
              <img height={150} src={imagePreview} alt="a" />
            ) : (
              <>
                <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "6rem" }} />
                <p style={{ textAlign: "center" }}>Upload Image</p>
              </>
            )}
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              width: "fit-content",
              backgroundColor: "rgb(84, 102, 249)",

              borderColor: "rgb(84, 102, 249, 0.3)",
              color: "white",
              "&:hover": {
                backgroundColor:
                  archiveOrUpload === "archive"
                    ? "rgb(84, 102, 249)"
                    : "rgb(84, 102, 249, 0.9)",
              },
            }}
            onClick={() => {
              setMakeupDialogOpen(false);
              setIsEdit(false);
              setImage(null);
              setImagePreview("");
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              width: "fit-content",
              backgroundColor: "rgb(84, 102, 249)",

              borderColor: "rgb(84, 102, 249, 0.3)",
              color: "white",
              "&:hover": {
                backgroundColor:
                  archiveOrUpload === "archive"
                    ? "rgb(84, 102, 249)"
                    : "rgb(84, 102, 249, 0.9)",
              },
            }}
            onClick={isEdit ? handleEditMakeup : handleAddMakeup}
            color="secondary"
          >
            {isEdit ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openImageDialog}
        onClose={handleCloseDialog}
        sx={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        PaperProps={{
          style: {
            margin: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ p: 2, gap: 2 }}
        >
          <Button
            variant={archiveOrUpload === "upload" ? "contained" : "outlined"}
            onClick={() => setArchiveOrUpload("upload")}
            sx={{
              width: "fit-content",
              backgroundColor:
                archiveOrUpload === "upload"
                  ? "rgb(84, 102, 249)"
                  : "transparent",
              borderColor: "rgb(84, 102, 249, 0.3)",
              color: archiveOrUpload === "upload" ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  archiveOrUpload === "upload"
                    ? "rgb(84, 102, 249)"
                    : "rgb(84, 102, 249, 0.1)",
              },
            }}
          >
            Upload
          </Button>
          <Button
            variant={archiveOrUpload === "upload" ? "outlined" : "contained"}
            onClick={() => setArchiveOrUpload("archive")}
            sx={{
              width: "fit-content",
              backgroundColor:
                archiveOrUpload === "archive"
                  ? "rgb(84, 102, 249)"
                  : "transparent",
              borderColor: "rgb(84, 102, 249, 0.3)",
              color: archiveOrUpload === "archive" ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  archiveOrUpload === "archive"
                    ? "rgb(84, 102, 249)"
                    : "rgb(84, 102, 249, 0.1)",
              },
            }}
          >
            Archive
          </Button>
        </Box>

        {archiveOrUpload === "upload" ? (
          <label htmlFor="file-upload">
            <Box
              p={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                cursor: "pointer",
                width: 500,
                height: 300,
                backgroundColor: "rgb(84, 102, 249, 0.3)",
                margin: "2rem",
                border: "1px solid rgb(84, 102, 249, 0.3)",
                "@media (max-width:800px)": {
                  width: 250,
                  height: 200,
                },
              }}
            >
              <Typography
                ml={1}
                mt={1}
                variant="h5"
                gutterBottom
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: " center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <CloudUploadIcon />
                Upload
              </Typography>
              <input
                id="file-upload"
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                  setOpenImageDialog(false);
                }}
              />
            </Box>
          </label>
        ) : (
          <Box
            p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            sx={{
              cursor: "pointer",
              width: 580,
              height: 500,
              "@media (max-width:800px)": {
                width: 300,
              },
            }}
          >
            <label htmlFor="file-archive-upload">
              <Paper
                sx={{
                  p: 2,
                  cursor: "pointer",
                  textAlign: "center",
                  flexBasis: {
                    xs: "100%", // Full width on small screens
                    sm: "calc(50% - 8px)", // Half width on small screens with gap
                    md: "calc(25% - 8px)", // Quarter width on medium and larger screens with gap
                  },
                }}
              >
                <Image
                  src={addIcon}
                  alt="Archive"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                  }}
                />
                <input
                  id="file-archive-upload"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageArchiveChange}
                />
              </Paper>
            </label>
            {archive.map((item, index) =>
              item.ImageUrl ? (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    textAlign: "center",
                    flexBasis: {
                      xs: "100%", // Full width on small screens
                      sm: "calc(50% - 8px)", // Half width on small screens with gap
                      md: "calc(25% - 8px)", // Quarter width on medium and larger screens with gap
                    },
                  }}
                  onClick={() => {
                    handleSetArchiveImage(item.ImageUrl);
                  }}
                >
                  <img
                    src={item.ImageUrl}
                    alt="Archive"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                    }}
                  />
                </Paper>
              ) : (
                " "
              )
            )}
          </Box>
        )}
      </Dialog>
    </div>
  );
};
export default UnlistedShares;

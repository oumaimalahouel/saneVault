import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "./addItem";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Box,
  Button,
  Modal,
  MenuItem,
  Select,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CardActions, IconButton } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Index = () => {
  const [items, setItems] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://159.65.235.250:5443/api/v1/items/get-hierarchy",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = response.data.resultData;

        // Tri des éléments avec le dossier "none" en dernier
        responseData.sort((a, b) => {
          if (a.folderName === "(none)") return 1;
          if (b.folderName === "(none)") return -1;
          return 0;
        });

        setItems(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://159.65.235.250:5443/api/v1/items/delete/${itemId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        // Item deleted successfully, update the state to remove the item
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        handleCloseConfirmationModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFolderToggle = (folder) => {
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(
        selectedFolders.filter((selectedFolder) => selectedFolder !== folder)
      );
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  const isFolderSelected = (folder) => {
    return !selectedFolders.includes(folder);
  };

  const renderFolder = (folder) => {
    const showChildFolders = isFolderSelected(folder);
    return (
      <div key={folder.id} style={{ padding: "30px" }}>
        <Typography
          variant="h6"
          style={{
            marginBottom: "8px",
            marginTop: "5px",
            paddingRight: "24px",
            height: "38px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            fontFamily: "'Open Sans',sans-serif",
            color: "#4D5E6E",
            fontWeight: "600",
            lineHeight: "36px",
          }}
        >
          <span>{folder.folderName}</span>
          <span style={{ marginLeft: "8px" }}>({folder.items.length})</span>
          <button
            onClick={() => handleFolderToggle(folder)}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              fontSize: "20px",
            }}
          >
            {showChildFolders ? <FaAngleUp color="#5547D2" /> : <FaAngleDown />}
          </button>
        </Typography>
        {showChildFolders && <Divider style={{ margin: "20px 20px" }} />}
        {showChildFolders && folder.items.length > 0 && (
          <Grid container spacing={2}>
            {folder.items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent style={{ flex: "1 0 auto" }}>
                    <Typography>
                      {item.folderName === "(none)" && (
                        <span style={{ textDecoration: "line-through" }}>
                          {item.websiteName}
                        </span>
                      )}
                      {item.folderName !== "(none)" && (
                        <span>{item.websiteName}</span>
                      )}
                      
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "flex-end" }}>
                    <IconButton
                      aria-label="settings"
                      size="small"
                      onClick={() => openModal(item.id)}
                    >
                      <SettingsIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleOpenConfirmationModal(item.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> )}
          {folder.childFolders && folder.childFolders.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              {folder.childFolders.map((childFolder) => renderFolder(childFolder))}
            </div>
          )}
       
      </div>
    );
  };

  const handleOpenConfirmationModal = (itemId) => {
    setShowConfirmationModal(true);
    setSelectedItemId(itemId);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedItemId(null);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModalData((prevState) => ({
      ...prevState,
      [name]: value,
      decodedPassword: prevState.decodedPassword || prevState.password,
      // Set the decodedPassword if it's not already set
    }));
  };

  const editItem = async (event) => {
    event.preventDefault();

    if (!modalData.id) {
      console.error("Item ID is null");
      return;
    }

    try {
      const payload = {
        websiteName: modalData.websiteName,
        websiteURL: modalData.websiteURL,
        note: modalData.note,
        password: modalData.decodedPassword,
        folderId: modalData.folderId,
      };

      const response = await axios.put(
        `http://159.65.235.250:5443/api/v1/items/edit/${modalData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const updatedItem = response.data.resultData;
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (updatedItem && item.id === updatedItem.id) {
            return updatedItem; // Replace the item with the updated item
          }
          return item; // Keep the other items unchanged
        })
      );

      handleClose();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = async (itemId) => {
    try {
      const response = await axios.get(
        `http://159.65.235.250:5443/api/v1/items/get-item-credentials/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const responseData = response.data.resultData;
      setModalData(responseData);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching item credentials:", error);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              id="modal-title"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "10px",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  color: "#5547D2",
                  fontSize: "35px",
                  fontWeight: "bold",
                  paddingBottom: "20px",
                }}
              >
                Password
              </span>
              <div
                style={{
                  backgroundImage: "url('assets/logo.svg')",
                  width: "195px",
                  height: "48px",
                }}
              />
            </Typography>

            <form onSubmit={editItem}>
              <TextField
                label="Website Name"
                fullWidth
                sx={{ mb: 2 }}
                name="websiteName"
                value={modalData.websiteName || ""}
                onChange={handleChange}
              />
              <TextField
                label="Website URL"
                fullWidth
                sx={{ mb: 2 }}
                name="websiteURL"
                value={modalData.websiteURL || ""}
                onChange={handleChange}
              />

              <TextField
                required
                id="decodedPassword"
                label="Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={modalData.decodedPassword || ""}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    decodedPassword: e.target.value,
                  }))
                }
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
                name="note"
                value={modalData.note || ""}
                onChange={handleChange}
              />

              <Typography
                variant="h6"
                id="modal-description"
                gutterBottom
              ></Typography>
              <Select
                value={modalData.folderId || ""}
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "white",
                  borderRadius: "4px",
                  width: "100%",
                  height: "50px",
                }}
                name="folderId"
                onChange={handleChange}
              >
                {items.map((folder) => (
                  <MenuItem key={folder.id} value={folder.id}>
                    {folder.folderName}
                  </MenuItem>
                ))}
              </Select>

              <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "150px",
                    mr: 2,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: "#5547D2",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "150px",
                  }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                id="modal-title"
                gutterBottom
              >
                Delete Item
              </Typography>
              <Typography color="text.secondary" id="modal-description">
                Are you sure you want to delete this item?
              </Typography>
            </CardContent>
            <CardActions
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button size="small" onClick={handleCloseConfirmationModal}>
                Cancel
              </Button>
              <Button size="small" onClick={() => deleteItem(selectedItemId)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </div>
      </Modal>
      <div>
        
      <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: "1000" }}>
        <AddItem />
      </div>
      <div style={{ marginTop: "80px" }}>
        {items.map((folder) => renderFolder(folder))}
      </div>
      </div>
    </div>
  );
};

export default Index;

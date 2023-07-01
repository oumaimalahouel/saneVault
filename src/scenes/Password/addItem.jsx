import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Card,
  CardContent,
  Modal,
  TextField,
  Button,
  IconButton,
  formControlClasses,
} from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import { Tooltip } from "@mui/material";
import { NestedSelect } from "./nestedSelect";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const AddItem = () => {
  const theme = useTheme();

  const accessToken = localStorage.getItem("accessToken");

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openErrMod,setOpenErrMod]=useState(false);
  const [openErrModItm,setOpenErrModItm]=useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openAnotherModal, setOpenAnotherModal] = useState(false);
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteURL: "",
    note: "",
    password: "",
    idItem: "",
  });
  const [folderFormData, setFolderFormData] = useState({
    folderName: "",
    description: "",
    parentFolderId: null,
  });
  const [folderVisibility, setfFolderVisibility] = useState(false);
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
        setItems(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const addItem = async (e) => {
    e.preventDefault();

    if(!(formData.websiteName)||
    !(formData.websiteURL)||
    !(formData.note)||
    !(formData.idItem)||
    !(formData.password)) {
      setOpenErrModItm(true);
    } else{
    try {
      const requestBody = {
        websiteName: formData.websiteName,
        websiteURL: formData.websiteURL,
        note: formData.note,
        password: formData.password,
        folderId: formData.idItem !== "" ? formData.idItem : null, // Ajout de la vérification ici
      };
      const asyncResult = await axios.post(
        "http://159.65.235.250:5443/api/v1/items/add-item",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (asyncResult.status == 200) {
        setItems([...items, requestBody]);
        handleClose();
        window.location.reload();
      } else console.error("un ereeur est survenu");
    } catch (error) {
      console.error("Error adding item:", error);
    }
    }


  };

  const FolderhandleChange = (e) => {
    setFolderFormData({ ...folderFormData, [e.target.name]: e.target.value });
  };

  const handleChange = (e, select = "") => {
    select
      ? setFormData({ ...formData, idItem: e })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 2500);
  };

  const handleOpenAnotherModal = () => {
    setOpenAnotherModal(true);
  };

  const handleCloseAnotherModal = () => {
    setFolderFormData({
      folderName: "",
      description: "",
      parentFolderId: null,
    });
    setOpenAnotherModal(false);
  };

  const handleFolderChange = (event) => {
    setFolderFormData({
      ...folderFormData,
      parentFolderId: event.target.value,
    });
  };

  const addFolder = async (e) => {
    e.preventDefault();
    if (!(folderFormData.description)||
    !(folderFormData.folderId)||
    !(folderFormData.folderName)) {
      setOpenErrMod(true);
    } else {
      try {
        const requestBody = {
          folderName: folderFormData.folderName,
          description: folderFormData.description,
          parentFolderId: folderFormData.folderId,
        };

        await axios.post(
          "http://159.65.235.250:5443/api/v1/folders/add-folder",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        handleCloseAnotherModal();
        window.location.reload();
      } catch (error) {
        console.error("Error adding folder:", error);
      }
    }
  };
  return (
    <Box m="85px">
      <Tooltip
        title={<span style={{ fontSize: "25px" }}>Add Item</span>}
        placement="left"
      >
        <IconButton
          style={{
            backgroundColor: "#5547D2",
            color: "white",
            width: "80px",
            height: "80px",
          }}
          onClick={handleOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AddIcon style={{ fontSize: "40px" }} />
        </IconButton>
      </Tooltip>

      {isHovered && (
        <Box mt={5}>
          <Tooltip
            title={<span style={{ fontSize: "25px" }}>Add New Folder</span>}
            placement="left"
          >
            <IconButton
              onClick={handleOpenAnotherModal}
              style={{
                backgroundColor: "#5547D2",
                color: "white",
                width: "80px",
                height: "80px",
              }}
            >
              <CreateNewFolderOutlinedIcon style={{ fontSize: "40px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {openErrMod&&<ErrorModal onClose={()=>setOpenErrMod(false)} open={openErrMod} errorsList={{...folderFormData}}/>}
      {openErrModItm&&<ErrorModal onClose={()=>setOpenErrModItm(false)} open={openErrModItm} errorsList={{...formData}}/>}

      <Modal
        open={openAnotherModal}
        onClose={handleCloseAnotherModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
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
              }}
            >
              Add Folder
            </span>
            <div
              style={{
                backgroundImage: "url('assets/logo.svg')",
                width: "195px",
                height: "48px",
              }}
            />
          </Typography>
          <Typography
            variant="h4"
            id="modal-title"
            gutterBottom
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Folder Name
          </Typography>
          <TextField
            label="Folder Name"
            fullWidth
            sx={{ mb: 2 }}
            name="folderName"
            value={folderFormData.folderName}
            onChange={FolderhandleChange}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            name="description"
            value={folderFormData.description}
            onChange={FolderhandleChange}
          />
          <NestedSelect
            list={items}
            value={folderFormData.folderId}
            placeHolder={"Nom de Dossier"}
            name={"folderName"}
            onSelect={(v) =>
              setFolderFormData({ ...folderFormData, folderId: v })
            }
          />
          <Typography></Typography>
          {/* Autres éléments du formulaire */}

          <Box display="flex" justifyContent="flex-end" sx={{ p: 3 }}>
            <Button
              variant="contained"
              onClick={handleCloseAnotherModal}
              sx={{
                marginRight: 2,
                backgroundColor: "white",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
                width: "200px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addFolder}
              sx={{
                backgroundColor: "#5547D2",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                width: "200px",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Modal>
      {open && isHovered && (
        <Box mt={5}>
          <Tooltip
            title={<span style={{ fontSize: "25px" }}>Add New Folder</span>}
            placement="left"
          >
            <IconButton
              onClick={handleOpenAnotherModal}
              style={{
                backgroundColor: "#5547D2",
                color: "white",
                width: "80px",
                height: "80px",
              }}
            >
              <CreateNewFolderOutlinedIcon style={{ fontSize: "40px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
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
                Add Password
              </span>
              <div
                style={{
                  backgroundImage: "url('assets/logo.svg')",
                  width: "195px",
                  height: "48px",
                }}
              />
            </Typography>

            <form onSubmit={addItem}>
              <TextField
                label="Website Name"
                fullWidth
                sx={{ mb: 2 }}
                name="websiteName"
                value={formData.websiteName}
                onChange={handleChange}
              />
              <TextField
                label="Website URL"
                fullWidth
                sx={{ mb: 2 }}
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleChange}
              />

              <TextField
                label="Password"
                fullWidth
                sx={{ mb: 2 }}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
              <Typography
                variant="h6"
                id="modal-description"
                gutterBottom
              ></Typography>
              <NestedSelect
                list={items}
                value={formData.idItem}
                placeHolder={"Nom de Dossier"}
                name={"idItem"}
                onSelect={(v) => handleChange(v, "select")}
              />

              <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button
                  type="submit"
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
                  Add
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};
const ErrorModal = ({ open = false, onClose = () => {} ,errorsList}) => {
  console.log('errorssss',errorsList);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: "0px !important",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 700 }}>
        <div
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "red",
            color: "#fff",
            padding: "38px 20px 0px",
          }}
        >
          <h1 id="parent-modal-title">Erreurs</h1>
        </div>
        <div style={{ padding: "38px 20px 0px", minHeight: "150px" }}>
          <h2 id="parent-modal-description">
            vous devez remplir le(s) champ(s) suivant(s):
          </h2>
          {
            <ol style={{ fontSize: "20px", marginLeft: "40px" }}>
              {Object.entries(errorsList)
              .filter(([k,v])=>!v)
              .map(([k,v])=>k)
              .map(v=><li>{v}</li>)}
            </ol>
          }
        </div>
        <Box display="flex" justifyContent="flex-end" sx={{ p: 3 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              marginRight: 2,
              backgroundColor: "gray",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              width: "200px",
            }}
          >
            Fermer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddItem;

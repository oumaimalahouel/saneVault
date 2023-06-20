import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import FolderIcon from "@mui/icons-material/Folder";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import axios from "axios";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[900],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [folders, setFolders] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          "http://159.65.235.250:5443/api/v1/folders/get-all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = response.data.resultData.map((folder) => ({
          ...folder,
          isOpen: false, // Ajouter une propriété isOpen à chaque dossier
        }));
        setFolders(data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };
    fetchFolders();
  }, [accessToken]);

  const renderFolder = (folder) => {
    const folderStyle = {
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 6px 20px #0000000D",
      borderRadius: "10px",
      gridTemplateColumns: "auto 1fr",
      marginLeft: "32px",
      width: "260px",
      marginBottom: "20px",
    };
    if (folder.folderName === "(none)") {
      return null; // Ne rien rendre si le nom est "(none)"
    }
    const handleFolderClick = (folderId) => {
      const updatedFolders = folders.map((f) => {
        if (f.id === folderId) {
          return {
            ...f,
            isOpen: !f.isOpen, // Inverser la valeur de isOpen pour le dossier cliqué
          };
        }
        return f;
      });
      setFolders(updatedFolders);
    };

    return (
      <div style={folderStyle}>
        <Box
          key={folder.id}
          display="flex"
          alignItems="center"
          flexDirection="row"
          marginLeft="35px"
          sx={{ marginBottom: "20px", cursor: "pointer" }}
          onClick={() => handleFolderClick(folder.id)} // Gérer le clic sur le dossier parent
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FolderIcon
              sx={{
                color: "#5547D2",
                fontSize: "50px",
                display: "flex",
              }}
            />
            <div>
              <Typography
                style={{
                  fontSize: "20px",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                {folder.folderName}
              </Typography>
            </div>
          </div>
        </Box>

        {folder.isOpen && folder.childFolders && folder.childFolders.length > 0 && (
          <Box padding="15px">
            {folder.childFolders.map((childFolder) => (
              <Box
                key={childFolder.id}
                display="flex"
                flexDirection="column"
                sx={{ cursor: "pointer", margin: "10px" }}
              >
                <div style={{ display: "flex", alignItems: "center", marginLeft: "60px" }}>
                  <FolderIcon
                    sx={{
                      color: "#5547D2",
                      marginRight: "8px",
                      fontSize: "25px",
                    }}
                  />
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "",
                      fontSize: "19px",
                    }}
                  >
                    {childFolder.folderName}
                  </Typography>
                </div>
              </Box>
            ))}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box sx={{}}>
      <div
        className="divvv"
        style={{ backgroundColor: "#F7F7FE" }}
        collapsed={isCollapsed}
      >
        <Menu iconShape="square">
          {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>*/}
          {/* LOGO AND MENU ICON */}
          {!isCollapsed && (
            <Box
              mb="73px"
              paddingLeft="30px"
              paddingRight="30px"
              background="#F7F7FE"
              paddingTop="40px"
              width="360px"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="profile-user"
                  width="300px"
                  height="50px"
                  src={`../../assets/logo.svg`}
                  //onClick={() => setIsCollapsed(!isCollapsed)}
                />
              </Box>
              <Box
                borderTop="1px solid #e5e5e5"
                marginTop="26px"
                width="300px"
                paddingRight="25px"
              ></Box>
            </Box>
          )}

          {!isCollapsed && (
            <Box
              paddingLeft={isCollapsed ? undefined : "10%"}
              style={{ height: "72px", width: "310px" }}
            ><Link to="/">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 6px 20px #0000000D",
                  borderRadius: "10px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src="../../assets/allItems.svg" alt="All Items" />
                  <span
                    style={{
                      marginLeft: "19px",
                      fontSize: "21px",
                      fontFamily: "",
                      fontWeight: "bold",
                      textDecoration:"none"
                    }}
                  >
                    All items
                  </span>
                </div>
                
              </div></Link>
            </Box>
          )}

          {/* Folders */}
          {!isCollapsed && (
            <Box
              paddingLeft={isCollapsed ? undefined : "10%"}
              style={{ height: "72px", width: "300px" }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 6px 20px #0000000D",
                  borderRadius: "10px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  alignItems: "center",
                   marginTop:"60px"
                }}
              >
                <FolderIcon
                  sx={{
                    color: "#5547D2",
                    fontSize: "50px",
                    display: "flex",
                    marginLeft: "20px",
                   
                  }}
                />
                <Typography
                  style={{
                    marginLeft: "20px",
                    fontSize: "21px",
                    fontFamily: "",
                    fontWeight: "bold",
                  }}
                >
                  Folders
                </Typography>
              </div>
            </Box>
          )}

          {/* Folders Menu */}
          <Box>
            {folders.length > 0 && (
              <Box>
                {folders.map((folder) => (
                  <Box key={folder.id}>{renderFolder(folder)}</Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Recently Deleted */}
          {!isCollapsed && (
            <Box
              paddingLeft={isCollapsed ? undefined : "10%"}
              style={{ width: "300px", marginBottom: "20px" }}
            >
              <Link to="/redeleted">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 6px 20px #0000000D",
                    borderRadius: "10px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    alignItems: "center",
                    paddingLeft: "25px",
                    paddingTop: "19.4px",
                    paddingBottom: "19.4px",
                  }}
                >
                  <AutoDeleteIcon style={{ fontSize: "2.5rem" }} />
                  <span
                    style={{
                      paddingRight: "10px",
                      marginLeft: "19px",
                      fontSize: "21px",
                      fontFamily: "",
                      fontWeight: "bold",
                      color: "#606060",
                    }}
                  >
                    Recently Deleted
                  </span>
                </div>
              </Link>
            </Box>
          )}

          {/* Logout */}
          {!isCollapsed && (
            <Box
              paddingLeft={isCollapsed ? undefined : "10%"}
              style={{ height: "72px", width: "300px", paddingBottom: "20px" }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 6px 20px #0000000D",
                  borderRadius: "10px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  alignItems: "center",
                }}
              >
                <Link to="/login">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "25px",
                      paddingTop: "19.4px",
                      paddingBottom: "19.4px",
                    }}
                  >
                    <img src="../../assets/logOut.svg" alt="logout" />
                    <span
                      style={{
                        paddingRight: "10px",
                        marginLeft: "19px",
                        fontSize: "21px",
                        fontFamily: "",
                        fontWeight: "bold",
                        color: "#606060",
                      }}
                    >
                      Log Out
                    </span>
                  </div>
                </Link>
              </div>
            </Box>
          )}
        </Menu>
      </div>
    </Box>
  );
};

export default Sidebar;

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import LinkIcon from "@mui/icons-material/Link";
import BadgeIcon from "@mui/icons-material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CardActions, IconButton } from "@mui/material";

export const CardItem=({item,openModal,handleOpenConfirmationModal})=>{

    return <Card
    style={{
      width: "300px",
      height: "200px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardContent style={{ flex: "1 0 auto" }}>
      <Typography
        style={{
          marginBottom: "8px",
          fontSize: "18px",
          fontFamily: "'Open Sans', sans-serif",
          color: "#5547D2",
          fontWeight: "600",
          lineHeight: "1.2",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <BadgeIcon
            style={{ marginRight: "6px", color: "#5547D2" }}
          />
          <span>
            {item.folderName === "(none)" ? (
              <s>{item.websiteName}</s>
            ) : (
              item.websiteName
            )}
          </span>
        </span>
      </Typography>
      <Typography
        style={{
          marginBottom: "8px",
          fontSize: "15px",
          fontFamily: "'Open Sans', sans-serif",
          color: "black",
          fontWeight: "600",
          lineHeight: "1.2",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <LinkIcon
            style={{ marginRight: "6px", color: "#5547D2" }}
          />
          <span>{item.websiteURL}</span>
        </span>
      </Typography>
    </CardContent>
    <CardActions style={{ justifyContent: "flex-end" }}>
      <IconButton
        aria-label="settings"
        size="small"
        style={{ marginRight: "8px" }}
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
}
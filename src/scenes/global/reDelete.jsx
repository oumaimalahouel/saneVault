import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, IconButton, Modal, Typography, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const ReDelete = () => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://159.65.235.250:5443/api/v1/items/items/recently-deleted",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const resultData = response.data.resultData;
      setDeletedItems(resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://159.65.235.250:5443/api/v1/items/perma-delete/${selectedItemId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSelectedItemId("");
      setShowConfirmationModal(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenConfirmationModal = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setSelectedItemId("");
    setShowConfirmationModal(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {deletedItems.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.websiteName}
                 
                  
                </Typography>
                <Typography variant="h6" component="div">
             
                  {item.websiteURL}
                  
                </Typography>
                <IconButton onClick={() => handleOpenConfirmationModal(item.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={showConfirmationModal} onClose={handleCloseConfirmationModal}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Delete Item
              </Typography>
              <Typography color="text.secondary">
              Are you sure you want to permanently delete this item ?
              </Typography>
            </CardContent>
            <Button onClick={handleCloseConfirmationModal}>Cancel</Button>
            <Button onClick={handleDeleteItem}>Delete</Button>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default ReDelete;

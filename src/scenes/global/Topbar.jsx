import { Box, IconButton, TextField, Autocomplete, Card, CardContent,Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

const Topbar = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Nouvelle variable d'état pour stocker l'item sélectionné
  const accessToken = localStorage.getItem("accessToken");

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

  useEffect(() => {
    const allSuggestions = items.reduce(
      (acc, item) => [...acc, ...item.items],
      []
    );

    const searchWords = (searchValue || "").toLowerCase().split(" ");
    const filteredSuggestions = allSuggestions.filter((suggestion) =>
      searchWords.every(
        (word) =>
          suggestion.websiteName &&
          suggestion.websiteName.toLowerCase().includes(word)
      )
    );

    setFilteredSuggestions(filteredSuggestions);
  }, [items, searchValue]);

  const handleSearchChange = (event, value) => {
    const selectedItem = items
      .map((item) => item.items)
      .flat()
      .find((item) => item.websiteName === value);
    setSearchValue(value);
    dispatch({
      type:'SELECTED_ITEM',
      payload:selectedItem
    })
    setSelectedItem(selectedItem);
  };

  const handleItemSelected = (value) => {
    const selectedItem = items
      .map((item) => item.items)
      .flat()
      .find((item) => item.websiteName === value);
    dispatch({
      type:'SELECTED_ITEM',
      payload:selectedItem
    })
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ boxShadow: 3 }} p={2}>
        <Autocomplete
          value={searchValue}
          onChange={handleSearchChange}
          options={filteredSuggestions.map((suggestion) => suggestion.websiteName)}
          onInputChange={(_, value) => handleSearchChange(null, value)}
          renderInput={(params) => (
            <Box display="flex" alignItems="center">
              <TextField
                {...params}
                sx={{ flex: 1, order: 1, display: "flex", flexGrow: 1 }}
                placeholder="Search my vault"
              />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}
          // onHighlightChange={(event, option) => handleItemSelected(option)}
        />
      </Box>

      {/* {selectedItem && (
       <Box mt={2} sx={{ p: 2 , backgroundColor:"#5547D2", float: 'right', width: '300px' }}>
       <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
         <CardContent>
           <Typography variant="h7" component="h2">Selected Item: {selectedItem.websiteName}</Typography>
           <Typography>Website Name: {selectedItem.websiteName}</Typography>
           <Typography>Website URL: {selectedItem.websiteURL}</Typography>
           <Typography>Note: {selectedItem.note}</Typography>
         </CardContent>
       </Card>
     </Box>
      )} */}
    </>
  );
};

export default Topbar;

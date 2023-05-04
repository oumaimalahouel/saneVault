import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";


const Password = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Url",
      headerName: "URL",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "SiteName",
      headerName: "Site Name",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "userEmail",
      headerName: "user Email",
      flex: 1,
    },
    {
      field: "Sitepassword",
      headerName: "Site Password",
      flex: 1,
    },
    
  ];

  return (
    <Box m="20px">
      <Header title="passwords" subtitle="Managing passwords" />
      <Box
        m="40px 0 0 0"
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[900],
            fontSize:"15px",
            
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
      
    </Box>
  );
};

export default Password;
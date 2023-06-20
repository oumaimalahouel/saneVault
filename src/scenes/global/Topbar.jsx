import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
/*import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";*/

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
  <div style={{paddingLeft:"48px" ,paddingTop:"100px"}} >

<Box display="flex" justifyContent="space-between"  sx={{ 
  boxShadow: 1 ,height:"153px",backgroundColor:"#5547D2",
  boxShadow:"0px 3px 20px #0000004A",borderRadius: "20px",
  width: "956px",fontSize:"22px",color:"#FFFFFF",font:"Nunito Sans",
  paddingLeft:"41px",paddingTop:"33px",paddingRight:"60px"}}
   >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Box>
</div>
/*
    <Box display="flex" justifyContent="space-between"  sx={{ boxShadow: 3 }}  p={2}>
      <Box sx={{ p: 1 }}><Typography  style={{fontSize: '1.5rem', fontWeight:'bold'}}> SaneVault</Typography></Box>
      
     
      <Box
        width={'70%'}
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ flex: 1,order: 1 ,display: 'flex', flexGrow: 1}}  placeholder="Search my vault "  />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

    
      <Box display="flex" sx={{ p: 1 }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
             <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>*/
  );
};

export default Topbar;
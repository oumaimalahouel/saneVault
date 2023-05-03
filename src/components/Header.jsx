import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px" display={"flex"} justifyContent={"space-between"}>
      
      <div>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
      </div>
      <div>
      <Fab color="secondary" aria-label="add" >
        <AddIcon />
      </Fab>
      </div>
      
    </Box>
  );
};

export default Header;
import React, { useState } from 'react';
import { Typography, Box, useTheme, TextField, Button, Modal, Card, CardContent } from "@mui/material";
import { tokens } from "../theme";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ title, subtitle }) => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

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
<Fab color="secondary" aria-label="add" onClick={handleOpen}>
<AddIcon />
</Fab>
</div>
<Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-title"
     aria-describedby="modal-description"
   >
<Card sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
<CardContent>
<Typography variant="h2" component="div" gutterBottom align="center">
Register your Password
</Typography>
<form>
<TextField label="URL" fullWidth sx={{mb: 2}}/>
<TextField label="Site Name" fullWidth sx={{mb: 2}}/>
<TextField label="User Name" fullWidth sx={{mb: 2}}/>
<TextField label="Site Password" fullWidth sx={{mb: 2}}/>
<TextField label="Notes" fullWidth multiline rows={4} sx={{mb: 2}}/>
<Box display="flex" justifyContent="flex-end">
<Button variant="contained" onClick={handleClose} sx={{mr: 2}}>
Cancel
</Button>
<Button variant="contained" color="primary" type="submit">
Register
</Button>
</Box>
</form>
</CardContent>
</Card>
</Modal>
</Box>
);
};

export default Header;






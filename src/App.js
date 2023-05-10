import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";


import { CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Password from "./scenes/Password";

import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";

import Login from "./scenes/authentification/Login";
import SignUp from "./scenes/authentification/SignUp";
import DashboradWrapper from "./components/DashboradWrapper";
import Addresses from "./scenes/addresses";




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       
         
        <div className="app">
        
          
          
            
            <Routes>
            < Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/" element={<DashboradWrapper ><Dashboard /></DashboradWrapper >} />
              <Route path="/password" element={<DashboradWrapper ><Password /></DashboradWrapper>} />
              <Route path="/addresses" element={<DashboradWrapper ><Addresses /></DashboradWrapper>} />
              <Route path="/faq" element={<DashboradWrapper ><FAQ /></DashboradWrapper>} />
              <Route path="/bar" element={<DashboradWrapper ><Bar /></DashboradWrapper>} />
            </Routes>
         
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
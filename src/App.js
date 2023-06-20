import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";


import { CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Index from "./scenes/Password/index.jsx";

import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";


import SignUp from "./scenes/authentification/SignUp";
import DashboradWrapper from "./components/DashboradWrapper";
import Addresses from "./scenes/addresses";
import ImageComponent from "./scenes/authentification/ImageComponent";
import LoginForm from "./scenes/authentification/LoginForm";
import AuthWrapper from "./components/authWrapper";
import ForgetPassword from "./scenes/authentification/forgetPassword";
import VerificationEmail from "./scenes/authentification/verificationEmail";
import ReDelete from "./scenes/global/reDelete";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       
         
        
        
          
          
            
            <Routes>
            < Route path="/form" element={<LoginForm/>} />
            < Route path="/image" element={<ImageComponent/>} />
            < Route path="/login" element={<AuthWrapper> <LoginForm/></AuthWrapper>} />
            <Route path="/signup" element={<AuthWrapper> <SignUp/></AuthWrapper>} />
            <Route path="/verificationEmail" element={<AuthWrapper> <VerificationEmail/></AuthWrapper>} />
            <Route path="/forgetPassword" element={<AuthWrapper><ForgetPassword/></AuthWrapper>} />
              <Route path="/" element={<DashboradWrapper ><Index /></DashboradWrapper >} />
              <Route path="/password" element={<DashboradWrapper ><Dashboard /></DashboradWrapper>} />
              <Route path="/addresses" element={<DashboradWrapper ><Addresses /></DashboradWrapper>} />
              <Route path="/faq" element={<DashboradWrapper ><FAQ /></DashboradWrapper>} />
              <Route path="/bar" element={<DashboradWrapper ><Bar /></DashboradWrapper>} />
              <Route path="/reDeleted" element={<DashboradWrapper ><ReDelete /></DashboradWrapper>} />
            </Routes>
         
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
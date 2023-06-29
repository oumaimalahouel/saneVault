import { useState } from "react";
import { Routes, Route,Navigate, } from "react-router-dom";
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
import BlockNavigate from './scenes/authentification/blockNavigate'
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const accessToken=localStorage.getItem('accessToken')
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
           <Routes>
            < Route path="/form" element={<LoginForm/>} />
            < Route path="/image" element={<ImageComponent/>} />
            < Route path="/login" element={<BlockNavigate><AuthWrapper> <LoginForm/></AuthWrapper></BlockNavigate>} />
            <Route path="/signup" element={<BlockNavigate><AuthWrapper> <SignUp/></AuthWrapper></BlockNavigate>} />
            <Route path="/verificationEmail" element={<BlockNavigate><AuthWrapper> <VerificationEmail/></AuthWrapper></BlockNavigate>} />
            <Route path="/forgetPassword" element={<BlockNavigate><AuthWrapper><ForgetPassword/></AuthWrapper></BlockNavigate>} />
              <Route path="/" element={!accessToken?<Navigate replace to="/login" />:<DashboradWrapper ><Index /></DashboradWrapper >} />
              <Route path="/password" element={!accessToken?<Navigate replace to="/login" />:<DashboradWrapper ><Dashboard /></DashboradWrapper>} />
              <Route path="/addresses" element={!accessToken?<Navigate replace to="/login" />:<DashboradWrapper ><Addresses /></DashboradWrapper>} />
              <Route path="/faq" element={!accessToken?<Navigate replace to="/login" />:<DashboradWrapper ><FAQ /></DashboradWrapper>} />
              <Route path="/bar" element={!accessToken?<Navigate replace to="/login" />:<DashboradWrapper ><Bar /></DashboradWrapper>} />
              <Route path="/reDeleted" element={!accessToken?<Navigate replace to="/login" />:<DashboradWrapper ><ReDelete /></DashboradWrapper>} />
            </Routes>
         
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
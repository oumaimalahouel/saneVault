import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { notify } from "./toast";
import { Typography } from "@mui/material";
import styles from "./FormComponent.module.css";
import VerificationEmail from "./verificationEmail";
import { useNavigate } from "react-router-dom";
import AddItem from "../Password/addItem"; 






const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
 
  const [touched, setTouched] = useState({});
  let navigate = useNavigate();


  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const [showPassword, setShowPassword] = useState(false); 
  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // envoyer la requette login et suivant le retour , on fait le controle
    const { email, password } = data;
    const urlApi = "http://159.65.235.250:5443/idp/auth/sign-in"; // Endpoint de l'API Swagger

    const requestBody = {
      email: email,
      password: password,
    };
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    axios
    .post(urlApi, requestBody)
    .then((response) => {
      // Traitez la réponse de l'API en fonction de votre logique d'authentification
      if (response?.data?.success) {
        // on va tester si le compte est vérifié ou pas
        if (response?.data?.resultData?.verifiedUser) {
          notify("You logged in to your account successfully", "success");
          navigate("/");
          localStorage.setItem("accessToken", response?.data?.resultData?.accessToken);
          

          // Appel à handleLogin pour transmettre l'access token
          handleLogin();
        } else {
          setShowVerificationForm(true);
        }
      } else {
        notify("Your password or email is wrong", "error");
      }
    })
    .catch((error) => {
      // Gérez les erreurs de l'API
      notify("Something went wrong!", "error");
    });
};
  
    //  try { 
    //   const verification = await axios.post(
    //     "http://159.65.235.250:5443/idp/auth/verify-email",
    //     {
    //       email,
    //       oTcode: verificationCode,
    //     }
    //   );
    //   if (verification.data.success) {
    //   }
    // } catch (error) {
    //   setIsIncorrectCodeModalOpen(true);
    //   console.log(
    //     "Une erreur s'est produite lors de la vérification du code :",
    //     error
    //   );
    // }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  return (
    <div>
    {showVerificationForm ? (
      <VerificationEmail />
    ) : (
    <form onSubmit={submitHandler} autoComplete="off" className={styles.formLogin}>
      <div className={styles.title}>
        <h3>LOG IN</h3>
      </div>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={data.email}
          placeholder="Type your email address..."
          onChange={changeHandler}
          onFocus={focusHandler}
          autoComplete="off"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Password</label>
        <div className={styles.passwordInputContainer}>
          <input
            type={showPassword ? "text" : "password"} // Utiliser le type "text" ou "password" en fonction de l'état showPassword
            name="password"
            value={data.password}
            placeholder="Type your Password . ."
            onChange={changeHandler}
            onFocus={focusHandler}
            autoComplete="off"
            className={styles.passwordInput}
          />
          <button type="button" className={styles.togglePassword} onClick={toggleShowPassword}>
            {showPassword ? <img src="/assets/visible.svg" alt="Visible" /> : <img src="/assets/invisible.svg" alt="Invisible" />} {/* Utiliser les images en fonction de l'état showPassword */}
          </button>
        </div>
        <div className="forgotPassword">
          <a href="/forgetPassword" style={{paddingTop:"100px",paddingLeft:"520px",textAlign:"left"}}>Forgot Password?</a>
        </div>
      </div>

      <div className={styles.FormGroup}>
        <button type="submit">Log In</button>
      </div>
 
 <div className="toSign" 
 style={{marginTop:"84px",marginLeft:"200px",textAlign:"left",font:"Lato",fontSize:"22px",fontWeight:"bold"
 }}>

          Don’t have an account? 
          <a href ="/signup">Sign Up Now</a>
          
        </div>

      <ToastContainer />
    </form>
    )}
    </div>
 
  );
};

export default LoginForm;
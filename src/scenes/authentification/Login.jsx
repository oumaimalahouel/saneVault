import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});

  const checkData = (obj) => {
    const { email, password } = obj;
    const urlApi = "http://159.65.235.250:5443/idp/auth/sign-in"; // Endpoint de l'API Swagger

    const requestBody = {
      email: email,
      password: password,
    };

    axios
    .post(urlApi, requestBody)
    .then((response) => {
      // Traitez la réponse de l'API en fonction de votre logique d'authentification
      if (response.data.success) {
        const accessToken = response.data.resultData.accessToken;
        const refreshToken = response.data.resultData.refreshToken;
        // Stockez accessToken et refreshToken dans la session
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        notify("You logged in to your account successfully", "success");
      } else {
        notify("Your password or email is wrong", "error");
      }
    })
    .catch((error) => {
      // Gérez les erreurs de l'API
      notify("Something went wrong!", "error");
    });
  
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    checkData(data);
  };


  return (
  
    <div className={styles.container}>
      
      <div className={styles.imageLogin}><img
                  
                  width="100%"
                  height="100%"
                  src={`../../assets/welcome.jpg`}

                  
                /></div>
      
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
      <h1>Hello ! </h1>
      <br />
        <h2>Good Morning</h2>
        <br />
        <div style={{ textAlign: 'end', marginTop:'50px' }}>
        <h2 style={{color:'rgb(200, 72, 225)',fontSize:'40px',marginLeft:'200px'}}>Login </h2> <h1>Your Account</h1>
        </div>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail Address" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            
                      </div>
        </div>

        
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            
          </div>
        </div>

        <div>
          <button type="submit">SUBMIT</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            <Link to="/signup">Create Account</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
 
  );
};

export default Login;

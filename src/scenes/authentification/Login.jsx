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

  const chaeckData = (obj) => {
    const { email, password } = obj;
    const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${email.toLowerCase()}&password=${password}`;
    const api = axios
      .get(urlApi)
      .then((response) => response.data)
      .then((data) => (data.ok ? notify("You login to your account successfully", "success") : notify("Your password or your email is wrong", "error")));
    toast.promise(api, {
      pending: "Loading your data...",
      success: false,
      error: "Something went wrong!",
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
    chaeckData(data);
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

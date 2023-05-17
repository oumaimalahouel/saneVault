import React, { useEffect, useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




// Validate
import { validate } from "./validate";
// Styles
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
import { Link } from "react-router-dom";
// Axios
import axios from "axios";
import CheckBoxIcon from '@mui/icons-material/CheckBox';




const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: true,
  });


const [isChecked, setIsChecked] = useState(false);

const handleCheckboxChange = (event) => {
  setIsChecked(event.target.checked);
};

const [errors, setErrors] = useState({});
const [touched, setTouched] = useState({});

useEffect(() => {
  setErrors(validate(data, "signUp"));
}, [data, touched]);

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
  if (!Object.keys(errors).length) {
    const urlApi = "http://159.65.235.250:5443/idp/auth/sign-up"; // Endpoint de l'API Swagger

    const requestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDayDate: data.birthday,
      password: data.password,
    };

    axios
      .post(urlApi, requestBody)
      .then((response) => {
        // Traitez la réponse de l'API en fonction de votre logique d'inscription
        if (response.status === 200) {
          notify("You signed up successfully", "success");
        } else {
          notify("Something went wrong!", "error");
        }
      })
      .catch((error) => {
        // Gérez les erreurs de l'API
        notify("Something went wrong!", "error");
      });
  } else {
    notify("Please check the fields again", "error");
    setTouched({
      firstName: true,
      lastName: true,
      birthday: true,
      email: true,
      password: true,
      confirmPassword: true,
      IsAccepted: false,
    });
  }
};

const [selectedDate, setSelectedDate] = useState(null);

const handleDateChange = (date) => {
  setSelectedDate(date);
  changeHandler({ target: { name: 'birthday', value: date } });
};
  return (

   
      <div className={styles.container}>
        <div className={styles.imagesignup}>
          <img
            alt="signup"
            width="100%"
            height="100%"
            src={`../../assets/signup.webp`}
          />
        </div>
        <form
          className={styles.formLogin}
          onSubmit={submitHandler}
          autoComplete="off"
          style={{ marginLeft: "300px", width: "500px" }}
        >
          <h2
            style={{
              color: "rgb(200, 72, 225)",
              fontSize: "45px",
              marginLeft: "260px",
            }}
          >
            Sign Up
          </h2>
    
          <div>
            <div
              className={
                errors.firstName && touched.firstName
                  ? styles.unCompleted
                  : !errors.firstName && touched.firstName
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                placeholder="First Name"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
            </div>
            {errors.firstName && touched.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
          </div>
    
          <div>
            <div
              className={
                errors.lastName && touched.lastName
                  ? styles.unCompleted
                  : !errors.lastName && touched.lastName
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                placeholder="Last Name"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
            </div>
            {errors.lastName && touched.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>
    
          <div>
            <div
              className={
                errors.birthday && touched.birthday
                  ? styles.unCompleted
                  : !errors.birthday && touched.birthday
                  ? styles.completed
                  : undefined
              }
              style={{ position: "relative" }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Birthday"
                autoComplete="off"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {errors.birthday && touched.birthday && (
              <span className={styles.error}>{errors.birthday}</span>
            )}
          </div>
    
          <div>
            <div
              className={
                errors.email && touched.email
                  ? styles.unCompleted
                  : !errors.email && touched.email
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="text"
                name="email"
                value={data.email}
                placeholder="E-mail..."
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
            </div>
            {errors.email && touched.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
    
          <div>
            <div
              className={
                errors.password && touched.password
                  ? styles.unCompleted
                  : !errors.password && touched.password
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Password"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
            </div>
            {errors.password && touched.password && (
             
             <span className={styles.error}>{errors.password}</span>
             )}
             </div>
             
             <div>
               <div
                 className={
                   errors.confirmPassword && touched.confirmPassword
                     ? styles.unCompleted
                     : !errors.confirmPassword && touched.confirmPassword
                     ? styles.completed
                     : undefined
                 }
               >
                 <input
                   type="password"
                   name="confirmPassword"
                   value={data.confirmPassword}
                   placeholder="Confirm Password"
                   onChange={changeHandler}
                   onFocus={focusHandler}
                   autoComplete="off"
                 />
               </div>
               {errors.confirmPassword && touched.confirmPassword && (
                 <span className={styles.error}>{errors.confirmPassword}</span>
               )}
             </div>
             
             <div>
               <div className={styles.terms} style={{}}>
                 {isChecked ? (
                   <CheckBoxIcon style={{ color: "violet" }} />
                 ) : (
                   <input
                     type="checkbox"
                     name="IsAccepted"
                     checked={isChecked}
                     id="accept"
                     onChange={handleCheckboxChange}
                     onFocus={focusHandler}
                     style={{ marginLeft: "240px" }}
                   />
                 )}
                 <label htmlFor="accept" style={{ color: "#a29494", textAlign: "end" }}>
                   I accept the terms of the privacy policy
                 </label>
               </div>
             </div>
             
             <div>
               <button type="submit">Create Account</button>
               <span
                 style={{
                   color: "#a29494",
                   textAlign: "center",
                   display: "inline-block",
                   width: "100%",
                 }}
               >
                 <Link to="/login">Sign In</Link>
               </span>
             </div>
             </form>
             <ToastContainer />
             </div>
             );
                             





                }

export default SignUp;

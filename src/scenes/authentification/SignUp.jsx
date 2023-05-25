import React, { useEffect, useState } from "react";

import 'react-datepicker/dist/react-datepicker.css';
import styles from "./FormComponent.module.css";
import { Link } from "react-router-dom";
// Validate
import { validate } from "./validate";
// Styles

import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//

// Axios
import axios from "axios";





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
  <form onSubmit={submitHandler} autoComplete="off" className={styles.formLogin}>
    <div className={styles.title}>
      <h3>Sign Up</h3>
    </div>
    <div className={styles.formGroup}>
      <div
        className={
          errors.firstName && touched.firstName
            ? styles.unCompleted
            : !errors.firstName && touched.firstName
            ? styles.completed
            : undefined
        }
      >
        <div className={styles.formGroup}>
          <label>First Name</label>
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            placeholder="Type here . ."
            onChange={changeHandler}
            onFocus={focusHandler}
            autoComplete="off"
          />
        </div>
      </div>
      {errors.firstName && touched.firstName && (
        <span className={styles.error}>{errors.firstName}</span>
      )}
    </div>

    <div className={styles.formGroup}>
      <div
        className={
          errors.lastName && touched.lastName
            ? styles.unCompleted
            : !errors.lastName && touched.lastName
            ? styles.completed
            : undefined
        }
      >
        <div className={styles.formGroup}>
          <label>Last Name</label>
        </div>
        <div>
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
      </div>
      {errors.lastName && touched.lastName && (
        <span className={styles.error}>{errors.lastName}</span>
      )}
    </div>
   <div className={styles.FormGroup}>
  <button type="submit" className={styles.next}>
  
    Next
     <img src="/assets/next.svg" alt="Next" />
  </button>
</div>
    <div className={styles.back}
      style={{
        marginTop: "84px",
        marginLeft: "250px",
        textAlign: "left",
        font: "Lato",
        fontSize: "22px",
        fontWeight: "bold",
      }}
    > <img src="/assets/back.svg" alt="Back" />
      <Link to="/Login">Back To Log In</Link>
    </div>

    <ToastContainer />
  </form>
);

    }
export default SignUp;

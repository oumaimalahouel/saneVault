import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./FormComponent.module.css";
import { Link } from "react-router-dom";
// Validate
import { validate } from "./validate";
// Styles
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
// Axios
import axios from "axios";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

 
const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    email:""
  });
console.log('hhhhh',data);
  const [errors, setErrors] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
 const [touched , setTouched]=useState({})

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

  const changeHandler = (event,type) => {
    if(type){
      setData({ ...data, birthday:event})
    }else
      setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(pageNumber<3){
      setPageNumber(pageNumber+1);
    }if(pageNumber==3){
         const urlApi = "http://159.65.235.250:5443/idp/auth/sign-up"; // Endpoint de l'API Swagger
          const requestBody = {
            firstName: data.firstName,
            lastName: data.lastName,
            email:data.email,
            password:data.password,
            birthDayDate:data.birthday
          };
        axios
        .post(urlApi, requestBody)
        .then((response) => {
          console.log(response)
          // Traitez la réponse de l'API en fonction de votre logique d'inscription
          if (response.status === 200) {
            notify("You signed up successfully", "success");
             navigate('/login');
          } else {
            notify(response.data.message||"Something went wrong!", "error");
          }
        })
        .catch((error) => {
          // Gérez les erreurs de l'API
          notify("Something went wrong!", "error");
        });
    }
    // if (!Object.keys(errors).length) {
    //   const urlApi = "http://159.65.235.250:5443/idp/auth/sign-up"; // Endpoint de l'API Swagger

    //   const requestBody = {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //   };

  //     axios
  //       .post(urlApi, requestBody)
  //       .then((response) => {
  //         // Traitez la réponse de l'API en fonction de votre logique d'inscription
  //         if (response.status === 200) {
  //           notify("You signed up successfully", "success");
  //         } else {
  //           notify("Something went wrong!", "error");
  //         }
  //       })
  //       .catch((error) => {
  //         // Gérez les erreurs de l'API
  //         notify("Something went wrong!", "error");
  //       });
  //   } else {
  //     notify("Please check the fields again", "error");
  //     // setTouched({
  //     //   firstName: true,
  //     //   lastName: true,
  //     // });
  //   }
   };
let navigate = useNavigate();
  return (
    <form
      onSubmit={submitHandler}
      autoComplete="off"
      className={styles.formLogin}
    >
      <div className={styles.title}>
        <h3>Sign Up</h3>
      </div>
      
        {pageNumber == 1 &&<Page1  
                            errors={errors}
                            setErrors={setErrors}
                            touched={touched}
                            setTouched={setTouched}
                            firstName={data.firstName} 
                            lastName={data.lastName} 
                            onChange={changeHandler}
                          /> }
{pageNumber == 2 &&<Page3 errors={errors}
                            setErrors={setErrors}
                            touched={touched}
                            setTouched={setTouched} 
                            birthday={data.birthday} 
                            email={data.email} 
                            onChange={changeHandler}/> }
     
        {pageNumber == 3 &&<Page2 errors={errors}
                            setErrors={setErrors}
                            touched={touched}
                            setTouched={setTouched}
                            password={data.password} 
                            confirmPassword={data.confirmPassword} 
                            onChange={changeHandler}/> }
        
      <div className={styles.FormGroup}>
        <button type="submit" className={styles.next}>
          {pageNumber < 3 ? "Next" : "Finish"}
          {pageNumber < 3 ?<img src="/assets/next.svg" alt="Next" />:''}
        </button>
      </div>

      <div
        className={styles.back}
        style={{
          marginTop: "84px",
          marginLeft: "250px",
          textAlign: "left",
          font: "Lato",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {" "}
        <img src="/assets/back.svg" alt="Back" />
        <Link to="/Login">Back To Log In</Link>
      </div>

      <ToastContainer />
    </form>
  );
};
export default SignUp;

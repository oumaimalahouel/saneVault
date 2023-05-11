import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


//Icon

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
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
    birthday:"", 
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
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
      // Pushing data to database usuing PHP script
      const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${data.email.toLowerCase()}&password=${data.password}&register=true`;
      const pushData = async () => {
        const responseA = axios.get(urlApi);
        const response = await toast.promise(responseA, {
          pending: "Check your data",
          success: "Checked!",
          error: "Something went wrong!",
        });
        if (response.data.ok) {
          notify("You signed Up successfully", "success");
        } else {
          notify("You have already registered, log in to your account", "warning");
        }
      };
      pushData();
    } else {
      notify("Please Check fileds again", "error");
      setTouched({
        firstName: true,
        lastName: true,
        birthday:true,
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

    <Box>
    <Box
      width="100%"
      backgroundColor="var(--main-color)"
      p="0.4rem 2%"
      textAlign="center"
      
    >
      <Typography fontWeight="bold" fontSize="32px" color="white">
        SaneVault
      </Typography>
    </Box>

    <div className={styles.container}>
      
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign Up</h2>
        


        <div>
          <div className={errors.firstName && touched.firstName ? styles.unCompleted : !errors.firstName && touched.firstName ? styles.completed : undefined}>
            <input type="text" name="firstName" value={data.firstName} placeholder="First Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <AccountCircleOutlinedIcon style={{position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' , marginLeft: '-5px',color:'var(--main-color)'}}/>
          </div>
          {errors.firstName && touched.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>

        
        <div>
          <div className={errors.lastName && touched.lastName ? styles.unCompleted : !errors.lastName && touched.lastName ? styles.completed : undefined}>
            <input type="text" name="lastName" value={data.lastName} placeholder="last Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <AccountCircleOutlinedIcon style={{position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' , marginLeft: '-5px',color:'var(--main-color)'}}/>
          </div>
          {errors.lastName && touched.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>




        <div>
        
    <div className={errors.birthday && touched.birthday ? styles.unCompleted : !errors.birthday && touched.birthday ? styles.completed : undefined} style={{ position: 'relative' }}>
      
      <DatePicker selected={selectedDate} onChange={handleDateChange} placeholderText="Birthday form day/month/year" autoComplete="off" dateFormat="dd/MM/yyyy" />
      <CalendarMonthOutlinedIcon style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', marginLeft: '-5px', color: 'var(--main-color)' }} />
    </div>
    {errors.birthday && touched.birthday && <span className={styles.error}>{errors.birthday}</span>}
  </div>



        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
          <EmailRoundedIcon style={{position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' , marginLeft: '-5px',color:'var(--main-color)'}}/>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
           
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <LockOutlinedIcon style={{position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' , marginLeft: '-5px',color:'var(--main-color)'}}/>
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div>
          <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
            <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <LockOutlinedIcon style={{position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' , marginLeft: '-5px',color:'var(--main-color)'}}/>
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>


        <div>
          <div className={styles.terms}>

           {isChecked ? (
        <CheckBoxIcon style={{ marginLeft: '-5px',color:'var(--main-color)'}} />
      ) : (
        <input type="checkbox" name="IsAccepted" checked={isChecked} id="accept" onChange={handleCheckboxChange} onFocus={focusHandler} />
      )}
      <label htmlFor="accept">I accept terms of privacy policy</label>  
        </div>
        </div>
        <div>


          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Already have a account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
    </Box>
  );
};

export default SignUp;

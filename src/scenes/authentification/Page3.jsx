import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
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
import DatePicker from "react-datepicker";

// Axios
import axios from "axios";

const Page3 = (props) => {
  const { birthday, email, onChange , errors,
    setErrors,
    touched,
    setTouched} = props;

 

  useEffect(() => {
    setErrors(validate( "Page3"));
  }, [ touched]);

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const [selectedDate, setSelectedDate] = useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   changeHandler({ target: { name: 'birthday', value: date } });
  // };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className={styles.formGroup}>
        <div
          className={
            errors.password && touched.password
              ? styles.unCompleted
              : !errors.password && touched.password
              ? styles.completed
              : undefined
          }
        >
          <div className={styles.formGroup}>
            <label>Date Of Birth</label>
          </div>
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
              name={"birthday"}
              selected={birthday}
              onChange={(date) => onChange(date, "date")}
              placeholderText="Type your date of birth . ."
              autoComplete="off"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          {errors.birthday && touched.birthday && (
            <span className={styles.error}>{errors.birthday}</span>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <div
          className={
            errors.email && touched.email
              ? styles.unCompleted
              : !errors.email && touched.email
              ? styles.completed
              : undefined
          }
        >
          <div className={styles.formGroup}>
            <label>Email</label>
          </div>
          <div>
           <input
              type="text"
              name="email"
              value={email}
              placeholder="E-mail..."
              onChange={onChange}
              onFocus={focusHandler}
              autoComplete="off"
            /> 
          </div>
        </div>
        {errors.email && touched.email && (
          <span className={styles.error}>{errors.email}</span>
        )}
      </div>

      <ToastContainer />
    </form>
  );
};

export default Page3;

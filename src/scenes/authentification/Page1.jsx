import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./FormComponent.module.css";
import { Link } from "react-router-dom";
// Validate
import { validate } from "./validate";
// Styles

import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer } from "react-toastify";

//
import "./FormComponent.module.css";
// Axios

const Page1 = (props) => {
  const {
    firstName,
    lastName,
    onChange,
    errors,
    setErrors,
    touched,
    setTouched,
  } = props;

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setErrors(validate({ ...props, type: 'signUp' }));
  }, [touched]);

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
    setErrors(validate({ ...props, [event.target.name]: event.target.value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formErrors = validate(props, 'signUp');
    setErrors(formErrors);
    setIsFormValid(Object.keys(formErrors).length === 0);
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className={styles.formGroup}>
        <div>
          <div className={styles.formGroup}>
            <label>First Name</label>
          </div>
          <div>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Type here . ."
              onChange={onChange}
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
        <div className={styles.formGroup}>
          <label>Last Name</label>
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={onChange}
            onFocus={focusHandler}
            autoComplete="off"
          />
        </div>
        {errors.lastName && touched.lastName && (
          <span className={styles.error}>{errors.lastName}</span>
        )}
      </div>

      {isFormValid && (
        <Link to="/page2">
          <button>Next</button>
        </Link>
      )}

      <ToastContainer />
    </form>
  );
};
;
export default Page1;

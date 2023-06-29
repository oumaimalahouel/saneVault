import React, { useEffect, useState } from "react";

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
const Page2 = (props) => {
  const {
    password,
    confirmPassword,
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
    if (Object.keys(formErrors).length === 0) {
      // Soumettre le formulaire ou effectuer d'autres actions
      // ...
    }
  };

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
            <label>Password</label>
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Type your password . ."
              onChange={onChange}
              onFocus={focusHandler}
              autoComplete="off"
            />
          </div>
        </div>
        {errors.password && touched.password && (
          <span className={styles.error}>{errors.password}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <div
          className={
            errors.confirmPassword && touched.confirmPassword
              ? styles.unCompleted
              : !errors.confirmPassword && touched.confirmPassword
              ? styles.completed
              : undefined
          }
        >
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Retype your password . ."
              onChange={onChange}
              onFocus={focusHandler}
              autoComplete="off"
            />
          </div>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword}</span>
        )}
      </div>

      {isFormValid && (
        <button type="submit">Submit</button>
      )}

      <ToastContainer />
    </form>
  );
};

export default Page2;




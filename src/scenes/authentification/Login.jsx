import React from "react";
import authWrapper from "../../components/authWrapper";
import ImageComponent from "./ImageComponent";
import LoginForm from "./LoginForm";
import styles from "./FormComponent.module.css";

const Login = () => {
  return (
 
      <div className={styles.container}>
        <div className={styles.left}>
          <ImageComponent />
        </div>
        <div className={styles.right}>
          <LoginForm />
        </div>
      </div>
    );
  };

export default Login;

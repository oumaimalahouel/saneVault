import React from "react";

import ImageComponent from "../scenes/authentification/ImageComponent";

import styles from "../scenes/authentification/FormComponent.module.css";

const AuthWrapper = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ImageComponent />
      </div>
      <div className={styles.right}>{props.children}</div>
    </div>
  );
};

export default AuthWrapper;

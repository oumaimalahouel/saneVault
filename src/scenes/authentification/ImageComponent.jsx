import React from "react";
import styles from "./ImageComponent.module.css";

const ImageComponent = (props) => {
  return (
    <div className={styles.imageContainer}>
        <h1>We protect your sensitive data</h1>
      <img src="../../assets/PASS.svg" alt="Image" />
      
    </div>
  );
};

export default ImageComponent;

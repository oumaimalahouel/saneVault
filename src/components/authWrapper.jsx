import React from 'react';
import Login from '../scenes/authentification/Login';
import ImageComponent from '../scenes/authentification/ImageComponent';
const authWrapper = (props) => {
    return (
        <div >
      <ImageComponent />
      <Login/>
    </div>
  );
};

export default authWrapper;

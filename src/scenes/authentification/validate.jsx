export const validate = (data, type) => {
    const errors = {};
/*
    if (type === "birthday") {
      errors.birthday = "birthday is Required!";
    } else if (!/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(data.birthday)) {
      errors.birthday = "Birthday is invalid! should be in the format day/month/year";
    } else {
      delete errors.birthday;
    }*/

  
    if (!data.email) {
      errors.email = "Email is Required!";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
      errors.email = "Email address is invalid!";
    } else {
      delete errors.email;
    }
  
    if (!data.password) {
      errors.password = "Password is Required";
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(String(data.password).toLowerCase())) {
      errors.password = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
    } else {
      delete errors.password;
    }
  
    if (type === "signUp") {
      if (!data.firstName ) {
        errors.firstName = "firstname is Required!";
      } else {
        delete errors.firstName;
      }
      console.log('birthday',data.birthday)
      if (!data.birthday ) {
        errors.birthday = "birthday is Required!";
      } else {
        delete errors.birthday;
      }
      if (type === "signUp") {
        if (!data.lastName ) {
          errors.lastName = "lastName is Required!";
        } else {
          delete errors.lastName;
        }
        

      if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm the Password";
      } else if (!(data.confirmPassword === data.password)) {
        errors.confirmPassword = "Password is not match!";
      } else {
        delete errors.confirmPassword;
      }
  
      if (data.IsAccepted) {
        delete errors.IsAccepted;
      } else {
        errors.IsAccepted = "Accept terms!";
      }
    }}
  
    return errors;
  };
  
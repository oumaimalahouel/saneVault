const validateEmail=(str)=>{
    const regEx = /^\S+@\S+\.\S+$/;
    return regEx.test(str)
}
const validatePassword =(str)=>{
    let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return regex.test(str);
}
export {
    validateEmail,
    validatePassword

}
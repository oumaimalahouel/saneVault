import React, { useState } from "react";
import styles from "./FormComponent.module.css";
import axios from "axios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { notify } from "./toast";
import { useNavigate } from "react-router-dom";
import { validate } from "./validate";


function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isIncorrectCodeModalOpen, setIsIncorrectCodeModalOpen] =
    useState(false);
  const [confirmationToken, setConfirmationToken] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer la requête POST à l'API pour envoyer le code de vérification à l'e-mail spécifié
      await axios.post(
        "http://159.65.235.250:5443/idp/auth/send-verification-code",
        {
          email,
        }
      );

      // Passer à l'étape suivante
      setStep(2);
    } catch (error) {
      // Gérer les erreurs de la requête si nécessaire
      console.log(
        "Une erreur s'est produite lors de l'envoi du code de vérification :",
        error
      );
    }
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    //2
    try {
      const response = await axios.post(
        "http://159.65.235.250:5443/idp/auth/verify-reset-password-code",
        {
          email,
          resetPasswordcode: verificationCode,
        }
      );

      // Vérifier si le code est correct
      const { resultData } = response.data;
      if (response.data.success) {
        // Récupérer emailConfirmationToken de resultData
        const { emailConfirmationToken } = resultData;
        setConfirmationToken(emailConfirmationToken);
        //3
        try {
          const responseInitiatePassword = await axios.post(
            "http://159.65.235.250:5443/idp/auth/initiate-password-reset",
            {
              email,
            }
          );
          if (responseInitiatePassword.data.success) {
            setStep(3);
          }
        } catch (error) {
          setIsIncorrectCodeModalOpen(true);
          console.log(
            "Une erreur s'est produite lors de la vérification du code :",
            error
          );
        }
        // Passer à l'étape suivante
      }
    } catch (error) {
      setIsIncorrectCodeModalOpen(true);
      console.log(
        "Une erreur s'est produite lors de la vérification du code :",
        error
      );
    }
    //end here
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer la requête POST à l'API pour réinitialiser le mot de passe
      const response = await axios.post(
        "http://159.65.235.250:5443/idp/auth/reset-password",
        {
          email,
          emailConfirmationToken: confirmationToken,
          newPassword,
        }
      );
      // Vérifier si la réinitialisation du mot de passe a réussi
      if (response.data.success) {
        notify(response.data.message, "success");
        navigate("/login");
      } else {
        // La réinitialisation du mot de passe a échoué
        console.log(
          "La réinitialisation du mot de passe a échoué :",
          response.data.message
        );
      }
    } catch (error) {
      // Gérer les erreurs de la requête si nécessaire
      console.log(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe :",
        error
      );
    }
  };

  const handleCloseModal = () => {
    setIsIncorrectCodeModalOpen(false);
  };

  return (
    <div className={styles.formLogin}>
      <div className={styles.title}>
        <h3>Password Recovery</h3>
      </div>
      <div className={styles.formGroup}>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Type your email address..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit">Send Verification Code</button>
          </form>
        )}
      </div>
      {step === 2 && (
        <form onSubmit={handleVerificationCodeSubmit}>
          <div className={styles.formGroup}>
            <label>Verification Code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <button type="submit">Verify Code</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPasswordSubmit}>
          <div className={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              placeholder="Type your password . ."
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password..."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Reset Password</button>
        </form>
      )}

      {isIncorrectCodeModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <ErrorOutlineIcon
              style={{ color: "red", height: "100px", width: "100px" }}
            />
            <h3>Incorrect Code</h3>
            <p>The verification code you entered is incorrect.</p>
            <button onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;

import React, { useState } from "react";
import styles from "./FormComponent.module.css";
import axios from "axios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { notify } from "./toast";
import { useNavigate } from "react-router-dom";

function VerificationEmail() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
 
  const [step, setStep] = useState(1);
  const [isIncorrectCodeModalOpen, setIsIncorrectCodeModalOpen] =
    useState(false);
  

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
  
    try {
      const verification = await axios.post(
        "http://159.65.235.250:5443/idp/auth/verify-email",
        {
          email,
          oTcode: verificationCode,
        }
      );

      if (verification.data.success) {
        const notif=notify(verification?.data?.message??'error uccured', "success");
        const nav=navigate('/login');
      } else {
        setIsIncorrectCodeModalOpen(true);
      }
    } catch (error) {
      setIsIncorrectCodeModalOpen(true);
      console.log("Une erreur s'est produite lors de la vérification du code :", error);
    }
  };
  





  const handleCloseModal = () => {
    setIsIncorrectCodeModalOpen(false);
  };
  

  return (
    <div className={styles.formLogin}>
      <div className={styles.title}>
        
        <h3>Verification Email</h3>
        <span>your email is not verified please verif your Email !</span>
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

export default VerificationEmail;
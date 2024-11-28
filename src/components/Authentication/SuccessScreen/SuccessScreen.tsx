import { useEffect } from "react";
import style from "../authentication.module.scss";
import signIn from "../../../assets/img/sign-in.png";
import signUp from "../../../assets/img/sign-up.png";
import resetPassword from "../../../assets/img/reset-password.png";
import { FaArrowLeft } from "react-icons/fa6";
import Logo from "../../Icon";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

type SuccessScreenProps = {
  type: "signIn" | "signUp" | "resetPassword";
  closeModal: () => void;
};

const SuccessScreen: React.FC<SuccessScreenProps> = ({ type, closeModal }) => {
  const isSignIn = type === "signIn";
  const isSignUp = type === "signUp";
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignIn) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSignIn, navigate]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.welcome}>
          <div className={style.back_button} onClick={closeModal}>
            <FaArrowLeft className={style.arrow} />
          </div>
          <div className={style.title}>
            {isSignIn
              ? "Sign In Successful!"
              : isSignUp
              ? "You're all set!"
              : "Password Reset Successful!"}
          </div>
        </div>
        <div className={style.subtitle}>
          {isSignUp
            ? "Start exploring latest movies, venues, and ticket options!"
            : "Please, wait. You will be redirected to the homepage."}
        </div>
        <div className={style.image}>
          <img
            src={isSignIn ? signIn : isSignUp ? signUp : resetPassword}
            alt="Success"
          />
        </div>
        {isSignUp && (
          <Button
            text="See Movies"
            onClick={() => {
              navigate("/home");
              closeModal();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SuccessScreen;

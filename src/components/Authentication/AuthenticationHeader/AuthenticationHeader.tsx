import style from "../authentication.module.scss";
import { FaArrowLeft } from "react-icons/fa6";
import Logo from "../../Icon";

type AuthenticationHeaderProps = {
  closeModal?: () => void;
  type:
    | "signIn"
    | "signUp"
    | "passwordReset"
    | "passwordResetCode"
    | "passwordResetPassword";
  maskedEmail?: string;
};

const AuthenticationHeader: React.FC<AuthenticationHeaderProps> = ({
  closeModal,
  type,
  maskedEmail,
}) => {
  const getTitle = () => {
    switch (type) {
      case "signIn":
        return "Welcome Back";
      case "signUp":
        return "Hello";
      case "passwordReset":
      case "passwordResetCode":
      case "passwordResetPassword":
        return "Password Reset";
      default:
        return "";
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case "passwordReset":
        return "Provide your account's email for which you want to reset your password.";
      case "passwordResetCode":
        return (
          <>
            We have sent a code to your email: <span>{maskedEmail}</span>.
            Please enter the code below to verify.
          </>
        );
      case "passwordResetPassword":
        return "Please, enter and confirm your new password.";
      default:
        return null;
    }
  };

  return (
    <>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.welcome}>
        <div className={style.back_button} onClick={closeModal}>
          <FaArrowLeft className={style.arrow} />
        </div>
        <div className={style.title}>{getTitle()}</div>
      </div>
      {getSubtitle() && <div className={style.subtitle}>{getSubtitle()}</div>}
    </>
  );
};

export default AuthenticationHeader;

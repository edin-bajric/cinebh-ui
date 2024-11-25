import style from "./sign-in.module.scss";
import Logo from "../Icon";
import Button from "../Button";
import {
  FaGoogle,
  FaApple,
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { useState } from "react";

const SignIn = ({
  closeModal,
  modalType,
  setModalType,
}: {
  closeModal: () => void;
  modalType: "signin" | "signup";
  setModalType: (type: "signin" | "signup") => void;
}) => {
  const isSignUp = modalType === "signup";

  const [activeFields, setActiveFields] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
    repeatPassword: false,
  });
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({
    password: false,
    repeatPassword: false,
  });

  const handleFocus = (field: string) => {
    setActiveFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setActiveFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const isActive = (field: string) =>
    activeFields[field] || inputValues[field].length > 0;

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
          <div className={style.title}>{isSignUp ? "Hello" : "Welcome Back"}</div>
        </div>
        <div className={style.form}>
          <div className={style.input}>
            <label>Email</label>
            <div className={style.inputWrapper}>
              <FaEnvelope
                className={`${style.icon} ${isActive("email") ? style.iconActive : ""}`}
              />
              <input
                type="text"
                placeholder="Email Address"
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className={style.input}>
            <label>Password</label>
            <div className={style.inputWrapper}>
              <FaLock
                className={`${style.icon} ${isActive("password") ? style.iconActive : ""}`}
              />
              <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button
                tabIndex={-1}
                type="button"
                className={style.togglePassword}
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {isSignUp && (
            <div className={style.input}>
              <label>Confirm Password</label>
              <div className={style.inputWrapper}>
                <FaLock
                  className={`${style.icon} ${
                    isActive("repeatPassword") ? style.iconActive : ""
                  }`}
                />
                <input
                  type={showPassword.repeatPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onFocus={() => handleFocus("repeatPassword")}
                  onBlur={() => handleBlur("repeatPassword")}
                  onChange={(e) => handleChange("repeatPassword", e.target.value)}
                />
                <button
                  tabIndex={-1}
                  type="button"
                  className={style.togglePassword}
                  onClick={() => togglePasswordVisibility("repeatPassword")}
                >
                  {showPassword.repeatPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}
          <div className={style.options}>
            <div className={style.remember}>
              <label className={style.customCheckbox}>
                <input type="checkbox" />
                <span></span>
              </label>
              <label className={style.remember_label}>Remember me</label>
            </div>
            <div className={style.forgot}>Forgot Password?</div>
          </div>
          <Button text={isSignUp ? "Sign Up" : "Sign In"} />
        </div>
        <div className={style.footer}>
          <div className={style.sign_up}>
            <p>
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account yet?"}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setModalType(isSignUp ? "signin" : "signup");
                }}
                className={style.link}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </a>
            </p>
          </div>
          <div className={style.divider}>
            <div className={style.line}></div>
            <p>or</p>
            <div className={style.line}></div>
          </div>
          <div className={style.social}>
            <p>Login with</p>
            <div className={style.social_icons}>
              <FaGoogle className={style.icon} />
              <FaApple className={style.icon} />
            </div>
          </div>
          <div className={style.continue} onClick={closeModal}>
            <p>Continue without Signing In</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

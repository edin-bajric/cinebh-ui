import style from "./authentication.module.scss";
import Logo from "../Icon";
import Button from "../Button";
import {
  //FaGoogle,
  //FaApple,
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, registerUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors } from "react-hook-form";
import SuccessScreen from "./SuccessScreen";
import { signInSchema, signUpSchema } from "./validationSchema";
import { label_error, error_color, input_error } from "./styling";
import PasswordReset from "./PasswordReset";
import {
  useInputState,
  usePasswordVisibility,
  useSuccessScreen,
  useRememberMe,
} from "./authenticationUtils";

export type RegisterFormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

const Authentication = ({
  closeModal,
  closeAllModals,
  modalType,
  setModalType,
}: {
  closeModal: () => void;
  closeAllModals: () => void;
  modalType: "signin" | "signup";
  setModalType: (type: "signin" | "signup") => void;
}) => {
  const isSignUp = modalType === "signup";
  const dispatch = useDispatch<AppDispatch>();
  const [modalState, setModalState] = useState<"auth" | "passwordReset">(
    "auth"
  );

  const {
    inputValues,
    handleFocus,
    handleBlur,
    handleChange,
    isActive,
    setInputValues,
  } = useInputState();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const {
    isSuccessScreenVisible,
    setIsSuccessScreenVisible,
    successScreenType,
    setSuccessScreenType,
  } = useSuccessScreen();
  const { rememberMe, handleRememberMeChange, setRememberMe } = useRememberMe();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setInputValues((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, [setInputValues, setRememberMe]);

  const schema = isSignUp ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    if (isSignUp) {
      const registerData = data as RegisterFormData;

      dispatch(registerUser(registerData))
        .unwrap()
        .then(() => {
          if (rememberMe) {
            localStorage.setItem("email", registerData.email);
          } else {
            localStorage.removeItem("email");
          }
          setSuccessScreenType("signUp");
          setIsSuccessScreenVisible(true);
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setError("email", {
              type: "server",
              message: "An error occurred during registration.",
            });
          } else {
            setError("email", {
              type: "server",
              message: "Email invalid or already in use.",
            });
          }
        });
    } else {
      const loginData = data as LoginFormData;

      dispatch(login(loginData))
        .unwrap()
        .then(() => {
          if (rememberMe) {
            localStorage.setItem("email", loginData.email);
          } else {
            localStorage.removeItem("email");
          }
          setSuccessScreenType("signIn");
          setIsSuccessScreenVisible(true);
        })
        .catch((error) => {
          if (error.response?.status === 403) {
            setError("password", {
              type: "server",
              message: "Incorrect password",
            });
          } else {
            setError("email", {
              type: "server",
              message: "Incorrect email or password.",
            });
          }
        });
    }
  };

  if (isSuccessScreenVisible && successScreenType) {
    return (
      <SuccessScreen
        type={successScreenType}
        closeModal={closeModal}
        closeAllModals={closeAllModals}
      />
    );
  }

  return (
    <div className={style.container}>
      {modalState === "passwordReset" ? (
        <PasswordReset
          closeModal={() => setModalState("auth")}
          closeAllModals={closeAllModals}
        />
      ) : (
        <div className={style.content}>
          <div className={style.logo}>
            <Logo />
          </div>
          <div className={style.welcome}>
            <div className={style.back_button} onClick={closeModal}>
              <FaArrowLeft className={style.arrow} />
            </div>
            <div className={style.title}>
              {isSignUp ? "Hello" : "Welcome Back"}
            </div>
          </div>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.input}>
              <label style={errors.email ? label_error : {}}>Email</label>
              <div className={style.input_wrapper}>
                <FaEnvelope
                  className={`${style.icon} ${
                    isActive("email") ? style.icon_active : ""
                  }`}
                  style={errors.email ? error_color : {}}
                />
                <input
                  type="text"
                  placeholder="Email Address"
                  value={inputValues.email}
                  onFocus={() => handleFocus("email")}
                  {...register("email", {
                    required: true,
                    onChange: (e) => handleChange("email", e.target.value),
                    onBlur: () => handleBlur("email"),
                  })}
                  style={errors.email ? { ...error_color, ...input_error } : {}}
                />
              </div>
              {errors.email && (
                <p className={style.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={style.input}>
              <label
                style={
                  errors.password || "repeatPassword" in errors
                    ? label_error
                    : {}
                }
              >
                Password
              </label>
              <div className={style.input_wrapper}>
                <FaLock
                  className={`${style.icon} ${
                    isActive("password") ? style.icon_active : ""
                  }`}
                  style={
                    errors.password || "repeatPassword" in errors
                      ? error_color
                      : {}
                  }
                />
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Password"
                  onFocus={() => handleFocus("password")}
                  {...register("password", {
                    required: true,
                    onChange: (e) => handleChange("password", e.target.value),
                    onBlur: () => handleBlur("password"),
                  })}
                  style={
                    errors.password || "repeatPassword" in errors
                      ? { ...error_color, ...input_error }
                      : {}
                  }
                />
                <button
                  tabIndex={-1}
                  type="button"
                  className={style.toggle_password}
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword.password ? (
                    <FaEye
                      style={
                        errors.password || "repeatPassword" in errors
                          ? error_color
                          : {}
                      }
                    />
                  ) : (
                    <FaEyeSlash
                      style={
                        errors.password || "repeatPassword" in errors
                          ? error_color
                          : {}
                      }
                    />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={style.error}>{errors.password.message}</p>
              )}
              {"repeatPassword" in errors && (
                <p className={style.error}>
                  {
                    (errors as FieldErrors<RegisterFormData>).repeatPassword
                      ?.message
                  }
                </p>
              )}
            </div>
            {isSignUp && (
              <div className={style.input}>
                <label style={"repeatPassword" in errors ? label_error : {}}>
                  Confirm Password
                </label>
                <div className={style.input_wrapper}>
                  <FaLock
                    className={`${style.icon} ${
                      isActive("repeatPassword") ? style.icon_active : ""
                    }`}
                    style={"repeatPassword" in errors ? error_color : {}}
                  />
                  <input
                    type={showPassword.repeatPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onFocus={() => handleFocus("repeatPassword")}
                    {...register("repeatPassword", {
                      required: true,
                      onChange: (e) =>
                        handleChange("repeatPassword", e.target.value),
                      onBlur: () => handleBlur("repeatPassword"),
                    })}
                    style={
                      "repeatPassword" in errors
                        ? { ...error_color, ...input_error }
                        : {}
                    }
                  />
                  <button
                    tabIndex={-1}
                    type="button"
                    className={style.toggle_password}
                    onClick={() => togglePasswordVisibility("repeatPassword")}
                  >
                    {showPassword.repeatPassword ? (
                      <FaEye
                        style={"repeatPassword" in errors ? error_color : {}}
                      />
                    ) : (
                      <FaEyeSlash
                        style={"repeatPassword" in errors ? error_color : {}}
                      />
                    )}
                  </button>
                </div>
                {"repeatPassword" in errors && (
                  <p className={style.error}>
                    {
                      (errors as FieldErrors<RegisterFormData>).repeatPassword
                        ?.message
                    }
                  </p>
                )}
              </div>
            )}
            <div className={style.options}>
              <div className={style.remember}>
                <label className={style.custom_checkbox}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <span></span>
                </label>
                <label className={style.remember_label}>Remember me</label>
              </div>
              <div
                className={style.forgot}
                onClick={() => setModalState("passwordReset")}
              >
                Forgot Password?
              </div>
            </div>
            <Button text={isSignUp ? "Sign Up" : "Sign In"}/>
          </form>
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
            {/*
            <div className={style.social}>
              <p>Login with</p>
              <div className={style.social_icons}>
                <FaGoogle className={style.icon} />
                <FaApple className={style.icon} />
              </div>
            </div>
            */}
            <div className={style.continue} onClick={closeModal}>
              <p>Continue without Signing In</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;

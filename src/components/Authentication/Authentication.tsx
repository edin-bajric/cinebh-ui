import style from "./authentication.module.scss";
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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login, registerUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FieldErrors } from "react-hook-form";
import SuccessScreen from "./SuccessScreen";

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
  modalType,
  setModalType,
}: {
  closeModal: () => void;
  modalType: "signin" | "signup";
  setModalType: (type: "signin" | "signup") => void;
}) => {
  const isSignUp = modalType === "signup";
  const dispatch = useDispatch<AppDispatch>();

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

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({
    password: false,
    repeatPassword: false,
  });

  const [isSuccessScreenVisible, setIsSuccessScreenVisible] =
    useState<boolean>(false);
  const [successScreenType, setSuccessScreenType] = useState<
    "signIn" | "signUp" | null
  >(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setInputValues((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

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

  const signInSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const signUpSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });

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
          setSuccessScreenType("signIn");
          setIsSuccessScreenVisible(true);
          setTimeout(() => {
            closeModal();
          }, 3000);
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

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    if (rememberMe) {
      localStorage.removeItem("email");
    }
  };

  if (isSuccessScreenVisible && successScreenType) {
    return <SuccessScreen type={successScreenType} closeModal={closeModal} />;
  }

  const label_error = {
    color: "rgba(253, 162, 155, 1)",
  };

  const error_color = {
    color: "rgba(240, 68, 56, 1)",
  };

  const input_error = {
    border: "2px solid rgba(253, 162, 155, 1)",
  };

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
            <label style={errors.password ? label_error : {}}>Password</label>
            <div className={style.input_wrapper}>
              <FaLock
                className={`${style.icon} ${
                  isActive("password") ? style.icon_active : ""
                }`}
                style={errors.password ? error_color : {}}
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
                  errors.password ? { ...error_color, ...input_error } : {}
                }
              />
              <button
                tabIndex={-1}
                type="button"
                className={style.toggle_password}
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword.password ? (
                  <FaEye style={errors.password ? error_color : {}} />
                ) : (
                  <FaEyeSlash style={errors.password ? error_color : {}} />
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
            <div className={style.forgot}>Forgot Password?</div>
          </div>
          <Button text={isSignUp ? "Sign Up" : "Sign In"} />
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

export default Authentication;

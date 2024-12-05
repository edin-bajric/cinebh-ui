import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetPasswordSchema } from "../../validationSchema";
import style from "../../authentication.module.scss";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import Button from "../../../Button";
import {
  useInputState,
  usePasswordVisibility,
} from "../../authenticationUtils";
import { label_error, error_color, input_error } from "../../styling";
import useResetPassword from "../../../../hooks/useResetPassword";
import SuccessScreen from "../../SuccessScreen";
import { useState } from "react";
import AuthenticationHeader from "../../AuthenticationHeader";

type PasswordResetPasswordProps = {
  email: string;
  closeAllModals: () => void;
  closeModal: () => void;
};

type PasswordResetFormData = {
  password: string;
  repeatPassword: string;
};

const PasswordResetPassword: React.FC<PasswordResetPasswordProps> = ({
  email,
  closeAllModals,
  closeModal,
}) => {
  const { inputValues, handleFocus, handleBlur, handleChange, isActive } =
    useInputState();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const {
    mutate: resetPassword,
    isLoading,
    isError,
    isSuccess,
  } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: yupResolver(passwordResetPasswordSchema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: PasswordResetFormData) => {
    const payload = { email, password: data.password };
    resetPassword(payload, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: () => {},
    });
  };

  if (isSuccess && isSubmitted) {
    return (
      <SuccessScreen
        type="resetPassword"
        closeModal={() => setIsSubmitted(false)}
        closeAllModals={closeAllModals}
      />
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <AuthenticationHeader
          type="passwordResetPassword"
          closeModal={closeModal}
        />
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.input}>
            <label
              style={
                errors.password || "repeatPassword" in errors ? label_error : {}
              }
            >
              New Password
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
                placeholder="New Password"
                value={inputValues.password}
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
                  (errors as FieldErrors<PasswordResetFormData>).repeatPassword
                    ?.message
                }
              </p>
            )}
          </div>
          <div className={style.input}>
            <label style={errors.repeatPassword ? label_error : {}}>
              Repeat Password
            </label>
            <div className={style.input_wrapper}>
              <FaLock
                className={`${style.icon} ${
                  isActive("repeatPassword") ? style.icon_active : ""
                }`}
                style={errors.repeatPassword ? error_color : {}}
              />
              <input
                type={showPassword.repeatPassword ? "text" : "password"}
                placeholder="Repeat Password"
                value={inputValues.repeatPassword}
                onFocus={() => handleFocus("repeatPassword")}
                {...register("repeatPassword", {
                  required: true,
                  onChange: (e) =>
                    handleChange("repeatPassword", e.target.value),
                  onBlur: () => handleBlur("repeatPassword"),
                })}
                style={
                  errors.repeatPassword
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
                  <FaEye style={errors.repeatPassword ? error_color : {}} />
                ) : (
                  <FaEyeSlash
                    style={errors.repeatPassword ? error_color : {}}
                  />
                )}
              </button>
            </div>
            {errors.repeatPassword && (
              <p className={style.error}>{errors.repeatPassword.message}</p>
            )}
          </div>
          <Button
            text={isLoading ? "Loading..." : "Continue"}
            className={style.button}
          />
        </form>
        {isError && (
          <p className={style.error}>
            Failed to reset password. Please try again.
          </p>
        )}
        {isSuccess && (
          <p className={style.success}>
            Password reset successful. You can now log in.
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPassword;

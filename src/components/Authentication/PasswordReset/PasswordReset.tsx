import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetSchema } from "../validationSchema";
import {
  handleFocus,
  handleBlur,
  handleChange,
  isActive,
  inputValues,
} from "../AuthenticationUtils";
import style from "../authentication.module.scss";
import Logo from "../../Icon";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import Button from "../../Button";
import { label_error, error_color, input_error } from "../styling";

type PasswordResetProps = {
  closeModal: () => void;
};

type PasswordResetFormValues = {
  email: string;
};

const PasswordReset: React.FC<PasswordResetProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: yupResolver(passwordResetSchema),
  });

  const onSubmit: SubmitHandler<PasswordResetFormValues> = (data) => {
    console.log(data.email);
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
          <div className={style.title}>Password Reset</div>
        </div>
        <div className={style.subtitle}>
          Provide your account's email for which you want to reset your password.
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
          <Button text="Continue" />
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetSchema } from "../validationSchema";
import { useInputState } from "../authenticationUtils";
import style from "../authentication.module.scss";
import { FaEnvelope } from "react-icons/fa6";
import Button from "../../Button";
import { label_error, error_color, input_error } from "../styling";
import useSendPasswordResetEmail from "../../../hooks/useSendPasswordResetEmail";
import PasswordResetCode from "./PasswordResetCode";
import AuthenticationHeader from "../AuthenticationHeader";

type PasswordResetProps = {
  closeModal: () => void;
  closeAllModals: () => void;
};

type PasswordResetFormValues = {
  email: string;
};

const PasswordReset: React.FC<PasswordResetProps> = ({
  closeModal,
  closeAllModals,
}) => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: yupResolver(passwordResetSchema),
  });

  const { inputValues, handleFocus, handleBlur, handleChange, isActive } =
    useInputState();

  const { mutate, isLoading, isError, isSuccess } = useSendPasswordResetEmail();

  const onSubmit: SubmitHandler<PasswordResetFormValues> = async (data) => {
    setEmail(data.email);
    mutate(data.email);
  };

  if (isSuccess && !isCodeModalOpen) {
    setIsCodeModalOpen(true);
  }

  return (
    <div className={style.container}>
      {isCodeModalOpen && email ? (
        <PasswordResetCode
          email={email}
          closeModal={closeModal}
          closeAllModals={closeAllModals}
        />
      ) : (
        <div className={style.content}>
          <AuthenticationHeader type="passwordReset" closeModal={closeModal} />
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
              {isError && (
                <p className={style.error}>
                  Failed to send email. Please try again.
                </p>
              )}
              {isSuccess && (
                <p className={style.success}>
                  Email sent successfully. Please check your inbox.
                </p>
              )}
            </div>
            <Button
              text={isLoading ? "Sending..." : "Continue"}
              className={style.button}
              type="submit"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;

import React, { useState, useEffect } from "react";
import style from "../../authentication.module.scss";
import Logo from "../../../Icon";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../../Button";
import useValidateCode from "../../../../hooks/useValidateCode";
import useSendPasswordResetEmail from "../../../../hooks/useSendPasswordResetEmail";

type PasswordResetCodeProps = {
  email: string;
  closeModal: () => void;
};

const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return email;
  }
  return `${localPart[0]}${"*".repeat(localPart.length - 2)}${localPart.slice(
    -1
  )}@${domain}`;
};

const PasswordResetCode: React.FC<PasswordResetCodeProps> = ({ email, closeModal }) => {
  const maskedEmail = maskEmail(email);
  const [inputs, setInputs] = useState<string[]>(["", "", "", ""]);
  const { mutate: validateCode, isLoading, isError } = useValidateCode();
  const { mutate: sendEmail } = useSendPasswordResetEmail();
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    if (value && index < inputs.length - 1) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputs.join("");
    if (code.length === 4) {
      validateCode(
        { email, code },
        {
          
        }
      );
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      sendEmail(email, {
        onSuccess: () => {
          setTimer(60);
        },
        onError: () => {
        },
      });
    }
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
          We have sent a code to your email: <span>{maskedEmail}</span>. Please
          enter the code below to verify.
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.input} id={style.input}>
            {inputs.map((value, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                autoComplete="new-password"
                maxLength={1}
                className={style.code_input}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className={style.question}>Didn't receive the email?</div>
          <div className={style.resend}>
            {timer > 0 ? (
              <>
                You can resend the email in <span>{timer}</span> seconds.
              </>
            ) : (
              <span className={style.resend_link} onClick={handleResend}>
                Resend Email
              </span>
            )}
          </div>
          {isError && (
            <div className={style.error}>Failed to validate the code.</div>
          )}
          <Button
            text={isLoading ? "Validating..." : "Continue"}
            className={style.button}
          />
        </form>
      </div>
    </div>
  );
};

export default PasswordResetCode;

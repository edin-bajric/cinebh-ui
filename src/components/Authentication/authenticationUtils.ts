import { useState } from "react";

type FieldState = { [key: string]: boolean };
type InputValuesState = { [key: string]: string };
type PasswordVisibilityState = { [key: string]: boolean };

export const useInputState = () => {
  const [activeFields, setActiveFields] = useState<FieldState>({
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [inputValues, setInputValues] = useState<InputValuesState>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleFocus = (field: string) => {
    setActiveFields((prev: FieldState) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setActiveFields((prev: FieldState) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: string, value: string) => {
    setInputValues((prev: InputValuesState) => ({ ...prev, [field]: value }));
  };

  const isActive = (field: string) =>
    activeFields[field] || inputValues[field].length > 0;

  return {
    inputValues,
    setInputValues,
    handleFocus,
    handleBlur,
    handleChange,
    isActive,
  };
};

export const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState<PasswordVisibilityState>({
    password: false,
    repeatPassword: false,
  });

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev: PasswordVisibilityState) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return { showPassword, togglePasswordVisibility };
};

export const useSuccessScreen = () => {
  const [isSuccessScreenVisible, setIsSuccessScreenVisible] =
    useState<boolean>(false);
  const [successScreenType, setSuccessScreenType] = useState<
    "signIn" | "signUp" | null
  >(null);

  return {
    isSuccessScreenVisible,
    setIsSuccessScreenVisible,
    successScreenType,
    setSuccessScreenType,
  };
};

export const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleRememberMeChange = () => {
    setRememberMe((prev: boolean) => {
      if (prev) {
        localStorage.removeItem("email");
      }
      return !prev;
    });
  };

  return { rememberMe, setRememberMe, handleRememberMeChange };
};

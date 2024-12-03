import { useState } from "react";

export const useInputState = () => {
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

  const handleFocus = (field: string) => {
    setActiveFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setActiveFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
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
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({
    password: false,
    repeatPassword: false,
  });

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
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
    setRememberMe((prev) => {
      if (prev) {
        localStorage.removeItem("email");
      }
      return !prev;
    });
  };

  return { rememberMe, setRememberMe, handleRememberMeChange };
};

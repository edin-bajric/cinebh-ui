import { useState } from "react";

export const [activeFields, setActiveFields] = useState<{
  [key: string]: boolean;
}>({
  email: false,
  password: false,
  repeatPassword: false,
});

export const [inputValues, setInputValues] = useState<{
  [key: string]: string;
}>({
  email: "",
  password: "",
  repeatPassword: "",
});

export const [rememberMe, setRememberMe] = useState<boolean>(false);
export const [showPassword, setShowPassword] = useState<{
  [key: string]: boolean;
}>({
  password: false,
  repeatPassword: false,
});

export const [isSuccessScreenVisible, setIsSuccessScreenVisible] =
  useState<boolean>(false);
export const [successScreenType, setSuccessScreenType] = useState<
  "signIn" | "signUp" | null
>(null);

export const handleFocus = (field: string) => {
  setActiveFields((prev) => ({ ...prev, [field]: true }));
};

export const handleBlur = (field: string) => {
  setActiveFields((prev) => ({ ...prev, [field]: false }));
};

export const handleChange = (field: string, value: string) => {
  setInputValues((prev) => ({ ...prev, [field]: value }));
};

export const togglePasswordVisibility = (field: string) => {
  setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
};

export const isActive = (field: string) =>
  activeFields[field] || inputValues[field].length > 0;

export const handleRememberMeChange = () => {
  setRememberMe(!rememberMe);
  if (rememberMe) {
    localStorage.removeItem("email");
  }
};

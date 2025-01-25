import React from "react";
import style from "../new-card.module.scss";
import { IconType } from "react-icons";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  icon?: IconType;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder = "",
  maxLength,
  icon: Icon,
}) => (
  <div className={style.form_group}>
    <label htmlFor={id}>{label}</label>
    <div className={style.input_wrapper}>
      {Icon && <Icon className={style.icon} />}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={Icon ? style.card_number : ""}
      />
    </div>
  </div>
);

export default FormInput;

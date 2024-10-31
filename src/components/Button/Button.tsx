import React from "react";
import s from "../../assets/css/button.module.css";

type Props = {
  text: string;
  color: string;
  textColor: string;
  borderColor: string;
};

const Button: React.FC<Props> = ({ text, color, textColor, borderColor }) => {
  return (
    <div id="container">
      <button
        className={s.button}
        style={{
          backgroundColor: color,
          color: textColor,
          border: `1px solid ${borderColor}`,
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

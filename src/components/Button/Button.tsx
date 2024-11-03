import React from "react";
import styles from "./button.module.css";

type Props = {
  text: string;
  color: string;
  textColor: string;
  borderColor: string;
  className?: string; 
};

const Button: React.FC<Props> = ({
  text,
  color,
  textColor,
  borderColor,
  className,
}) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        style={{
          backgroundColor: color,
          color: textColor,
          borderColor: borderColor,
        }}
        className={`${styles.button} ${className || ""}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

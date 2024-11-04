import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

type Props = {
  text: string;
  variant?: "solid" | "outlined" | "navbar";
  className?: string;
};

const Button: React.FC<Props> = ({ text, variant = "solid", className }) => {
  const buttonClass = classNames(styles.button, styles[variant], className);
  return (
    <div className={styles.container}>
      <button type="button" className={buttonClass}>
        {text}
      </button>
    </div>
  );
};

export default Button;

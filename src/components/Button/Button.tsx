import React from "react";

type Props = {
  text: string;
  color: string;
  textColor: string;
};

const Button: React.FC<Props> = ({ text, color, textColor }) => {
  return (
    <div id="container">
      <button
        style={{
          backgroundColor: color,
          border: "1px solid rgba(178, 34, 34, 1)",
          borderRadius: "8px",
          padding: "12px 20px 12px 20px",
          color: textColor,
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.005em",
          cursor: "pointer",
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

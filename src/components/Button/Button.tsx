type Props = {
  text: string;
  color: string;
  textColor: string;
  borderColor: string;
};

const Button = (props: Props) => {
  return (
    <div id="container">
      <button
        style={{
          backgroundColor: props.color,
          border: "1px solid",
          borderColor: props.borderColor,
          borderRadius: "8px",
          padding: "12px 20px 12px 20px",
          color: props.textColor,
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.005em",
          cursor: "pointer",
        }}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;

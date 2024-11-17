import style from "./error.module.scss";
import Button from "../Button";

const Error = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.message}>Unable to connect</p>
        <Button
          text="Try again"
          variant="solid"
          onClick={handleReload}
        ></Button>
      </div>
    </div>
  );
};

export default Error;

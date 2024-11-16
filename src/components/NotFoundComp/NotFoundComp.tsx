import style from "./not-found-comp.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button";

const NotFoundComp = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.oops}>Oops!</p>
        <p className={style.text}>
          The page you were looking for doesn't exist.
        </p>
        <Link to ="/" className={style.link}><Button text="Go to Home" variant="solid"></Button></Link>
      </div>
    </div>
  );
};

export default NotFoundComp;

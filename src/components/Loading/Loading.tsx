import style from "./loading.module.scss";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className={style.container}>
      <ClipLoader color="rgba(178, 34, 34, 1)" size={100} />
    </div>
  );
};

export default Loading;

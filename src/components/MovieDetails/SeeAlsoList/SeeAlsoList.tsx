import style from "./see-also-list.module.scss";
import SeeAlsoCard from "../SeeAlsoCard";

const SeeAlsoList = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <p>See Also</p>
        </div>
        <div className={style.see_also_list}>
          <SeeAlsoCard />
        </div>
        <div className={style.pagination}>
          
        </div>
      </div>
    </div>
  );
};

export default SeeAlsoList;

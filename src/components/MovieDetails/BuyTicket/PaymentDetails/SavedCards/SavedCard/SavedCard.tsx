import style from "./saved-card.module.scss";
import { FaCcVisa } from "react-icons/fa6";

const SavedCard = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
          <div className={style.icon}>
            <FaCcVisa />
          </div>
          <div className={style.card_number}>
            <p>**** **** **** 1234</p>
          </div>
          <div className={style.delete_card}>
            <p>Delete Card</p>
          </div>
      </div>
    </div>
  )
}

export default SavedCard
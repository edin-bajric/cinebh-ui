import style from "./new-card.module.scss";
import Button from "../../../../Button";

const NewCard = () => {
  return (
    <div className={style.container}>
      <form className={style.card_form}>
        <div className={style.form_group}>
          <label htmlFor="card_number">Card Number</label>
          <input type="text" id="card_number" placeholder="Enter card number" />
        </div>
        <div className={style.expiry_cvv}>
          <div className={style.form_group}>
            <label htmlFor="expiry_date">Expiry Date</label>
            <input type="text" id="expiry_date" placeholder="MM/YY" />
          </div>
          <div className={style.form_group}>
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="Enter CVV" />
          </div>
        </div>
        <Button
          text="Make Payment"
          type="submit"
          variant="solid"
          width="100%"
        ></Button>
      </form>
    </div>
  );
};

export default NewCard;

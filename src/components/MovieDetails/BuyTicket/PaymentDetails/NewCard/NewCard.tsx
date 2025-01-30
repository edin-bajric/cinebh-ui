import style from "./new-card.module.scss";
import Button from "../../../../Button";
import { FaCreditCard } from "react-icons/fa6";
import { useState } from "react";
import {
  handleCardNumberChange,
  handleExpiryDateChange,
  handleCvcChange,
} from "./newCardUtils";
import { useLocation } from "react-router-dom";
import FormInput from "./FormInput";

const NewCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const location = useLocation();
  const { state } = location;
  const { totalPrice } = state || {};

  const isFormValid =
    cardNumber.length === 19 && expiryDate.length === 5 && cvc.length === 3;

  return (
    <div className={style.container}>
      <form className={style.card_form}>
        <FormInput
          label="Card Number"
          id="card_number"
          type="text"
          value={cardNumber}
          onChange={(e) => handleCardNumberChange(e, setCardNumber)}
          placeholder="**** **** **** ****"
          maxLength={19}
          icon={FaCreditCard}
        />
        <div className={style.expiry_cvc}>
          <FormInput
            label="Expiry Date"
            id="expiry_date"
            type="text"
            value={expiryDate}
            onChange={(e) => handleExpiryDateChange(e, setExpiryDate)}
            placeholder="MM/YY"
            maxLength={5}
          />
          <FormInput
            label="CVC"
            id="cvc"
            type="text"
            value={cvc}
            onChange={(e) => handleCvcChange(e, setCvc)}
            placeholder="000"
            maxLength={3}
          />
        </div>
        <Button
          text={`Make Payment - ${totalPrice ? `${totalPrice} KM` : ""}`}
          type="submit"
          variant="solid"
          width="100%"
          disabled={!isFormValid}
        />
      </form>
    </div>
  );
};

export default NewCard;

import React from "react";
import { FaCheck } from "react-icons/fa";
import Button from "../Button";
import style from "../Pricing/pricing.module.css";

interface PriceBoxProps {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonBorderColor: string;
  containerStyle?: string;
}

const PriceBox: React.FC<PriceBoxProps> = ({
  name,
  price,
  features,
  buttonText,
  buttonColor,
  buttonTextColor,
  buttonBorderColor,
  containerStyle,
}) => {
  return (
    <div className={`${style.box} ${containerStyle}`}>
      <div className={style.first_info}>
        <p className={style.name}>{name}</p>
        <p className={style.price}>{price}</p>
        <p className={style.per_ticket}>*per ticket</p>
      </div>
      <div className={style.second_info}>
        {features.map((feature, index) => (
          <p key={index} className={style.feature}>
            <FaCheck className={style.check} /> {feature}
          </p>
        ))}
        <div className={style.button_container}>
          <Button
            text={buttonText}
            color={buttonColor}
            textColor={buttonTextColor}
            borderColor={buttonBorderColor}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceBox;

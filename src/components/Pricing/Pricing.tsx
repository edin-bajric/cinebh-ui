import style from "./pricing.module.css";
import Button from "../Button";
import { FaCheck } from "react-icons/fa";

const Pricing = () => {
  return (
    <div id={style.container}>
      <div id={style.content}>
        <p id={style.title}>Pricing</p>
        <p id={style.subtitle} className={style.text}>
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone's preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </p>
      </div>
      <div id={style.boxes}>
        <div id={style.regular} className={style.box}>
          <div className={style.first_info}>
            <p className={style.name}>Regular Seats</p>
            <p className={style.price}>7 KM</p>
            <p className={style.per_ticket}>*per ticket</p>
          </div>
          <div className={style.second_info}>
            <p className={style.feature1}>
              <FaCheck className={style.check} /> Comfortable seating
            </p>
            <p className={style.feature2}>
              <FaCheck className={style.check} /> Affordable pricing
            </p>
            <p className={style.feature3}>
              <FaCheck className={style.check} /> Wide selection
            </p>
            <p className={style.feature4}>
              <FaCheck className={style.check} /> Accessible locations
            </p>
            <p className={style.feature5}>
              <FaCheck className={style.check} /> Suitable for everyone
            </p>
            <div className={style.button_container}>
              <Button
                text={"Explore movies"}
                color={"rgba(252, 252, 253, 1)"}
                textColor={"rgba(178, 34, 34, 1)"}
                borderColor={"rgba(178, 34, 34, 1)"}
              ></Button>
            </div>
          </div>
        </div>
        <div id={style.love} className={style.box}>
          <div className={style.first_info}>
            <p className={style.name}>Love Seats</p>
            <p className={style.price}>24 KM</p>
            <p className={style.per_ticket}>*per ticket</p>
          </div>
          <div className={style.second_info}>
            <p className={style.feature1}>
              <FaCheck className={style.check} /> Side-by-side design
            </p>
            <p className={style.feature2}>
              <FaCheck className={style.check} /> Comfortable padding
            </p>
            <p className={style.feature3}>
              <FaCheck className={style.check} /> Adjustable armrests
            </p>
            <p className={style.feature4}>
              <FaCheck className={style.check} /> Cup holders
            </p>
            <p className={style.feature5}>
              <FaCheck className={style.check} /> Reserved for couples
            </p>
            <div className={style.button_container}>
              <Button
                text={"Explore movies"}
                color={"rgba(178, 34, 34, 1)"}
                textColor={"rgba(252, 252, 253, 1)"}
                borderColor={"rgba(178, 34, 34, 1)"}
              ></Button>
            </div>
          </div>
        </div>
        <div id={style.vip} className={style.box}>
          <div className={style.first_info}>
            <p className={style.name}>Vip Seats</p>
            <p className={style.price}>10 KM</p>
            <p className={style.per_ticket}>*per ticket</p>
          </div>
          <div className={style.second_info}>
            <p className={style.feature1}>
              <FaCheck className={style.check} /> Enhanced comfort
            </p>
            <p className={style.feature2}>
              <FaCheck className={style.check} /> Priority seating
            </p>
            <p className={style.feature3}>
              <FaCheck className={style.check} /> Prime viewing
            </p>
            <p className={style.feature4}>
              <FaCheck className={style.check} /> Personal space
            </p>
            <p className={style.feature5}>
              <FaCheck className={style.check} /> Luxury extras
            </p>
            <div className={style.button_container}>
              <Button
                text={"Explore movies"}
                color={"rgba(252, 252, 253, 1)"}
                textColor={"rgba(178, 34, 34, 1)"}
                borderColor={"rgba(178, 34, 34, 1)"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

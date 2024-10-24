import s from "../../assets/css/pricing.module.css";
import Button from "../Button";
import { FaCheck } from "react-icons/fa";

const Pricing = () => {
  return (
    <div id={s.container}>
      <div id={s.content}>
        <p id={s.title}>Pricing</p>
        <p id={s.subtitle} className={s.text}>
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone's preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </p>
      </div>
      <div id={s.boxes}>
        <div id={s.regular} className={s.box}>
          <div className={s.first_info}>
            <p className={s.name}>Regular Seats</p>
            <p className={s.price}>7 KM</p>
            <p className={s.per_ticket}>*per ticket</p>
          </div>
          <div className={s.second_info}>
            <p className={s.feature1}>
              <FaCheck className={s.check} /> Comfortable seating
            </p>
            <p className={s.feature2}>
              <FaCheck className={s.check} /> Affordable pricing
            </p>
            <p className={s.feature3}>
              <FaCheck className={s.check} /> Wide selection
            </p>
            <p className={s.feature4}>
              <FaCheck className={s.check} /> Accessible locations
            </p>
            <p className={s.feature5}>
              <FaCheck className={s.check} /> Suitable for everyone
            </p>
            <div className={s.button_container}>
              <Button
                text={"Explore movies"}
                color={"rgba(252, 252, 253, 1)"}
                textColor={"rgba(178, 34, 34, 1)"}
                borderColor={"rgba(178, 34, 34, 1)"}
              ></Button>
            </div>
          </div>
        </div>
        <div id={s.love} className={s.box}>
          <div className={s.first_info}>
            <p className={s.name}>Love Seats</p>
            <p className={s.price}>24 KM</p>
            <p className={s.per_ticket}>*per ticket</p>
          </div>
          <div className={s.second_info}>
            <p className={s.feature1}>
              <FaCheck className={s.check} /> Side-by-side design
            </p>
            <p className={s.feature2}>
              <FaCheck className={s.check} /> Comfortable padding
            </p>
            <p className={s.feature3}>
              <FaCheck className={s.check} /> Adjustable armrests
            </p>
            <p className={s.feature4}>
              <FaCheck className={s.check} /> Cup holders
            </p>
            <p className={s.feature5}>
              <FaCheck className={s.check} /> Reserved for couples
            </p>
            <div className={s.button_container}>
              <Button
                text={"Explore movies"}
                color={"rgba(178, 34, 34, 1)"}
                textColor={"rgba(252, 252, 253, 1)"}
                borderColor={"rgba(178, 34, 34, 1)"}
              ></Button>
            </div>
          </div>
        </div>
        <div id={s.vip} className={s.box}>
          <div className={s.first_info}>
            <p className={s.name}>Vip Seats</p>
            <p className={s.price}>10 KM</p>
            <p className={s.per_ticket}>*per ticket</p>
          </div>
          <div className={s.second_info}>
            <p className={s.feature1}>
              <FaCheck className={s.check} /> Enhanced comfort
            </p>
            <p className={s.feature2}>
              <FaCheck className={s.check} /> Priority seating
            </p>
            <p className={s.feature3}>
              <FaCheck className={s.check} /> Prime viewing
            </p>
            <p className={s.feature4}>
              <FaCheck className={s.check} /> Personal space
            </p>
            <p className={s.feature5}>
              <FaCheck className={s.check} /> Luxury extras
            </p>
            <div className={s.button_container}>
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

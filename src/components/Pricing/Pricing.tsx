import s from "../../assets/css/pricing.module.css";

const Pricing = () => {
  return (
    <div id={s.container}>
      <div id={s.content}>
        <p id={s.title}>Pricing</p>
        <p id={s.subtitle}>
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone's preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </p>
      </div>
      <div id={s.boxes}>
        <div id={s.regular}>
          <p className={s.name}>Regular Seats</p>
          <p className={s.price}>7 KM</p>
          <p className={s.per_ticket}>*per ticket</p>
          <p className={s.feature1}> Comfortable seating</p>
          <p className={s.feature2}> Affordable pricing</p>
          <p className={s.feature3}> Wide selection</p>
          <p className={s.feature4}> Accessible locations</p>
          <p className={s.feature5}> Suitable for everyone</p>
        </div>
        <div id={s.love}></div>
        <p className={s.name}>Love Seats</p>
        <p className={s.price}>24 KM</p>
        <p className={s.per_ticket}>*per ticket</p>
        <p className={s.feature1}> Side-by-side design</p>
        <p className={s.feature2}> Comfortable padding</p>
        <p className={s.feature3}> Adjustable armrests</p>
        <p className={s.feature4}> Cup holders</p>
        <p className={s.feature5}> Reserved for couples</p>
        <div id={s.vip}></div>
        <p className={s.name}>Vip Seats</p>
        <p className={s.price}>10 KM</p>
        <p className={s.per_ticket}>*per ticket</p>
        <p className={s.feature1}> Enhanced comfort</p>
        <p className={s.feature2}> Priority seating</p>
        <p className={s.feature3}> Prime viewing</p>
        <p className={s.feature4}> Personal space</p>
        <p className={s.feature5}> Luxury extras</p>
      </div>
    </div>
  );
};

export default Pricing;

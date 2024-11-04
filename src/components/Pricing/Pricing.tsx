import style from "./pricing.module.scss";
import PriceBox from "../PriceBox.tsx/PriceBox";

const Pricing = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.title}>Pricing</p>
        <p className={style.subtitle}>
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone's preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </p>
      </div>
      <div className={style.boxes}>
        <PriceBox
          name="Regular Seats"
          price="7 KM"
          features={[
            "Comfortable seating",
            "Affordable pricing",
            "Wide selection",
            "Accessible locations",
            "Suitable for everyone",
          ]}
          buttonText="Explore movies"
          variant="outlined"
          containerStyle={style.regular}
        ></PriceBox>
        <PriceBox
          name="Love Seats"
          price="24 KM"
          features={[
            "Side-by-side design",
            "Comfortable padding",
            "Adjustable armrests",
            "Cup holders",
            "Reserved for couples",
          ]}
          buttonText="Explore movies"
          variant="solid"
          containerStyle={style.love}
        />
        <PriceBox
          name="Vip Seats"
          price="10 KM"
          features={[
            "Enhanced comfort",
            "Priority seating",
            "Prime viewing",
            "Personal space",
            "Luxury extras",
          ]}
          buttonText="Explore movies"
          variant="outlined"
          containerStyle={style.vip}
        />
      </div>
    </div>
  );
};

export default Pricing;

import CarouselComp from "../CarouselComp";
import s from "../../assets/css/carousel.module.css";
import VenueSideScrollMenu from "../VenueSideScrollMenu";

const Homepage = () => {
  return (
    <div id={s.container}>
      <CarouselComp />
      <VenueSideScrollMenu />
    </div>
  );
};

export default Homepage;

import s from "../../assets/css/carousel.module.css";
import CarouselComp from "../CarouselComp";
import VenueSideScrollMenu from "../VenueSideScrollMenu";
import HomepageTile from "../HomepageTile";

const Homepage = () => {
  return (
    <div id={s.container}>
      <CarouselComp />
      <VenueSideScrollMenu />
      <HomepageTile title="Currently Showing" />
      <HomepageTile title="Upcoming Movies" />
      <HomepageTile title="Venues" />
    </div>
  );
};

export default Homepage;

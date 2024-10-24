import s from "../../assets/css/about.module.css";
import about from "../../assets/img/about.jpg";

const About = () => {
  return (
    <div id={s.container}>
      <div id={s.content}>
        <div id={s.left_content}>
          <p className={s.text}>About Our Dream.</p>
          <p className={s.text}>Our History.</p>
          <p className={s.text}>Cinema.</p>
        </div>
        <div id={s.right_content}>
          <p className={s.text} id={s.about_us}>About Us</p>
          <p className={s.text} id={s.first_text}>
            Welcome to Cinebh, where movie magic comes to life. </p>
            <p className={s.text} id={s.second_text}>At Cinebh, we're
            not just about screening films; we're passionate about creating
            unforgettable cinematic experiences. </p> <p className={s.text} id={s.third_text}>Since our establishment we've
            been dedicated to providing our audience with top-quality
            entertainment in a comfortable and welcoming environment. </p><p className={s.text} id={s.fourth_text}>Our
            state-of-the-art facilities boast the latest in audiovisual
            technology, ensuring that every movie is presented with stunning
            clarity and immersive sound. From the latest blockbusters to
            timeless classics, our diverse selection of films caters to every
            taste and preference.</p>
          <p className={s.text} id={s.fifth_text}>
            As a hub for community entertainment, we take pride in being more
            than just a cinema.</p> <p className={s.text} id={s.sixth_text}>Join us at Cinebh and discover why we're not
            just your average movie theater—we're your destination for cinematic
            excellence and entertainment bliss.
          </p>
        </div>
      </div>
        <img src={about} alt="about" id={s.image} />
    </div>
  );
};

export default About;

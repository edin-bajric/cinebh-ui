import style from "./currently-showing-card.module.scss";

const CurrentlyShowingCard = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.image}>
          <img
            src="https://media.vanityfair.com/photos/63a31b77d5d6e9f4c5f419af/master/w_1920,c_limit/avatar-visual-effects-lede.jpgaa"
            alt="Movie poster"
          />
        </div>
        <div className={style.middle_section}>
        <div className={style.details}>
          <p className={style.title}>Avatar</p>
          <div className={style.info}>
            <p className={style.text}>PG 13</p>
            <p className={style.divider}>|</p>
            <p className={style.text}>English</p>
            <p className={style.divider}>|</p>
            <p className={style.text}>117 Min</p>
          </div>
          <div className={style.genre_container}>
            <div className={style.genre}>
              <p>Fantasy</p>
            </div>
          </div>
          
        </div>
        <div className={style.playing_until}>
            <p>Playing in cinema until 11.12.2023.</p>
          </div>
          </div>
        <div className={style.showtimes}>
          <p className={style.showtimes_title}>Showtimes</p>
          <div className={style.showtimes_times}>
            <p>12:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyShowingCard;

import style from "./seat-options-movie-info.module.scss";

const SeatOptionsMovieInfo = () => {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <img
          src="https://ca-times.brightspotcdn.com/dims4/default/39ae952/2147483647/strip/true/crop/5000x2637+0+0/resize/1200x633!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fde%2Fff%2F11643b9d48c5bf41bf8aa3d1b882%2F2106-0130-v0477-1241.jpg"
          alt="movie poster"
        />
      </div>
      <div className={style.movie_info}>
        <div className={style.title}>Avatar: The Way of Water</div>
        <div className={style.info}>
          <p className={style.text}>PG 13</p>
          <p className={style.divider}>|</p>
          <p className={style.text}>English</p>
          <p className={style.divider}>|</p>
          <p className={style.text}>117 Min</p>
        </div>
      </div>
      <div className={style.booking_details}>
        <div className={style.title}>Booking Details</div>
        <div className={style.time_place}>
          <p className={style.text}>Monday, Dec 22 at 18:00</p>
          <p className={style.text}>
            Cineplex: Cinebh, Zmaja od Bosne 4, Sarajevo 71000
          </p>
        </div>
        <div className={style.hall}>
          <p className={style.text}>Hall 1</p>
        </div>
      </div>
    </div>
  );
};

export default SeatOptionsMovieInfo;

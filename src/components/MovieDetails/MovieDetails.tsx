import style from "./movie-details.module.scss";

const MovieDetails = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.page_title}>Movie Details</div>
        <div className={style.media}>
          <div className={style.trailer}></div>
          <div className={style.images}></div>
        </div>
        <div className={style.info}>
          <div className={style.title}></div>
          <div className={style.basic_info}>
            <p className={style.rating}></p>
            <p className={style.divider}></p>
            <p className={style.language}></p>
            <p className={style.divider}></p>
            <p className={style.length}></p>
            <p className={style.divider}></p>
            <p className={style.projection_date}></p>
          </div>
          <div className={style.genre_container}>
            <div className={style.genre}>
              <p></p>
            </div>
          </div>
          <div className={style.synopsis}>
            <p></p>
          </div>
          <div className={style.director}>
            <p className={style.creator}>Director: </p>
            <p className={style.director_name}></p>
          </div>
          <div className={style.writers}>
            <p className={style.creator}>Writers: </p>
             <p className={style.writers_name}></p>
          </div>
          <div className={style.cast}>
            <div className={style.section_title}>
                <p>|</p>
                <p>Cast</p>
                </div>
                <div className={style.cast_container}>
                    <div className={style.cast_member}>
                        <p className={style.cast_name}></p>
                        <p className={style.cast_role}></p>
                    </div>
                </div>
          </div>
          <div className={style.movie_rating}>
            <div className={style.section_title}>
                <p>|</p>
                <p>Rating</p>
            </div>
            <div className={style.movie_rating_container}>
                <div className={style.movie_rating_box}>
                    <p className={style.rating_star}></p>
                    <p className={style.rating_value}></p>
                    <p className={style.rating_provider}></p>
                </div>
            </div>
          </div>
          <div className={style.see_also_container}>
            // component to be added here
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

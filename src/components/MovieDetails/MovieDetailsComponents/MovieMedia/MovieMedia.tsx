import style from "../../movie-details.module.scss";

interface MovieMediaProps {
  trailerUrl?: string;
  images?: { id: string; url: string }[];
}

const MovieMedia = ({ trailerUrl, images = [] }: MovieMediaProps) => {
  return (
    <div className={style.media}>
      <div className={style.trailer}>
        <iframe
          src={trailerUrl || ""}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
          className={style.trailer_iframe}
        ></iframe>
      </div>
      <div className={style.images}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt="Movie Scene"
            className={style.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieMedia;

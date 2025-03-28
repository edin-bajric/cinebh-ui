import React from "react";
import style from "./see-also-card.module.scss";
import { Movie } from "../../../utils/types";
import { Link } from "react-router-dom";

type SeeAlsoCardProps = {
  movie: Movie;
};

const SeeAlsoCard: React.FC<SeeAlsoCardProps> = ({ movie }) => {
  const coverImage = movie.images.find((img) => img.isCoverImage)?.url || "";

  return (
    <Link to={`/movie/${movie.id}`} className={style.container}>
      <div className={style.card}>
        <div className={style.image}>
          <img src={coverImage} alt={movie.title} loading="lazy"/>
        </div>
        <div className={style.title}>
          <h3>{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default SeeAlsoCard;

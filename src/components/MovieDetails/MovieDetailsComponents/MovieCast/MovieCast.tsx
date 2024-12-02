import style from "../../movie-details.module.scss";

interface MovieCastProps {
  performers?: { id: string; name: string; role: string }[];
}

const MovieCast = ({ performers = [] }: MovieCastProps) => {
  return (
    <div className={style.cast}>
      <div className={style.section_title}>
        <p className={style.divider}>|</p>
        <p>Cast</p>
      </div>
      <div className={style.cast_container}>
        {performers.map((performer) => (
          <div key={performer.id} className={style.cast_member}>
            <p className={style.cast_name}>{performer.name}</p>
            <p className={style.cast_role}>{performer.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;

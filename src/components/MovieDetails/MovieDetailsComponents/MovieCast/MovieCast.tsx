import style from "../../movie-details.module.scss";

interface MovieCastProps {
  performers?: { id: string; name: string; role: string }[];
}

const MovieCast = ({ performers = [] }: MovieCastProps) => {
  const SECTION_TITLE = "Cast";
  return (
    <div className={style.cast}>
      <div className={style.section_title}>
        <p className={style.divider}>|</p>
        <p>{SECTION_TITLE}</p>
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

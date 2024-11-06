import style from "./currently-showing-date.module.scss";

const CurrentlyShowingDate = () => {
  return (
    <div className={style.container}>
      <div className={style.date_block}>
        <p className={style.date}>Dec 10</p>
        <p className={style.day}>Today</p>
      </div>
    </div>
  )
}

export default CurrentlyShowingDate
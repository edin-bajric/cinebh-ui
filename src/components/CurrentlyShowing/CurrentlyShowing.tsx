import style from "./currently-showing.module.scss";
import CurrentlyShowingAndUpcomingTitle from "../CurrentlyShowingAndUpcomingTitle";

const CurrentlyShowing = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <CurrentlyShowingAndUpcomingTitle type="currentlyShowing" totalItems={10} />
      </div>
    </div>
  )
}

export default CurrentlyShowing
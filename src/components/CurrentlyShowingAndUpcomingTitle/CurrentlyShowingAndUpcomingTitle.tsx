import style from "./currently-showing-and-upcoming-title.module.scss";

type Props = {
  type: "currentlyShowing" | "upcoming";
  totalItems: number;
};

const CurrentlyShowingAndUpcomingTitle: React.FC<Props> = ({
  type,
  totalItems,
}) => {
  return (
    <div className={style.container}>
        <p className={style.title}>
            {type === "currentlyShowing" ? "Currently Showing" : "Upcoming Movies"} ({totalItems})
        </p>
    </div>
  );
};

export default CurrentlyShowingAndUpcomingTitle;

import style from "./currently-showing-date.module.scss";

interface CurrentlyShowingDateProps {
  date: string;
  day: string;
  isSelected: boolean;
  onSelect: () => void;
}

const CurrentlyShowingDate: React.FC<CurrentlyShowingDateProps> = ({
  date,
  day,
  isSelected,
  onSelect,
}) => {
  return (
    <div className={style.container}>
      <div
        className={`${style.date_block} ${isSelected ? style.selected : ""}`}
        onClick={onSelect}
      >
        <p className={style.date}>{date}</p>
        <p className={style.day}>{day}</p>
      </div>
    </div>
  );
};

export default CurrentlyShowingDate;

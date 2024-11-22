import style from "./date-box.module.scss";

interface DateBoxProps {
  date: string;
  day: string;
  isSelected: boolean;
  onSelect: () => void;
  type?: "currentlyShowing" | "movieDetails";
}

const DateBox: React.FC<DateBoxProps> = ({
  date,
  day,
  isSelected,
  onSelect,
  type = "currentlyShowing",
}) => {
  return (
    <div className={`${style.container} ${style[type]}`}>
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

export default DateBox;

import CurrentlyShowingDate from "../CurrentlyShowingDate";
import style from "./currently-showing-date-tile.module.scss";

interface CurrentlyShowingDateTileProps {
  onDateSelect: (selectedDate: string) => void;
  selectedDate: string;
}

const generateDateArray = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      day:
        i === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toISOString().split("T")[0],
    });
  }
  return dates;
};

const CurrentlyShowingDateTile: React.FC<CurrentlyShowingDateTileProps> = ({
  onDateSelect,
  selectedDate,
}) => {
  const dates = generateDateArray();

  return (
    <div className={style.container}>
      {dates.map((dateObj, index) => (
        <CurrentlyShowingDate
          key={index}
          date={dateObj.date}
          day={dateObj.day}
          isSelected={selectedDate === dateObj.fullDate}
          onSelect={() => onDateSelect(dateObj.fullDate)}
        />
      ))}
    </div>
  );
};

export default CurrentlyShowingDateTile;

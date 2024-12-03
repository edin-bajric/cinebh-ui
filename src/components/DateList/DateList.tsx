import DateBox from "../DateBox";
import style from "./date-list.module.scss";

interface DateListProps {
  onDateSelect: (selectedDate: string) => void;
  selectedDate: string;
  type?: "currentlyShowing" | "movieDetails";
}

const generateDateArray = () => {
  const today = new Date();

  return Array.from({ length: 10 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      day:
        i === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toISOString().split("T")[0],
    };
  });
};

const DateList: React.FC<DateListProps> = ({
  onDateSelect,
  selectedDate,
  type = "currentlyShowing",
}) => {
  const dates = generateDateArray();

  return (
    <div className={style.container}>
      {dates.map((dateObj, index) => (
        <DateBox
          key={index}
          date={dateObj.date}
          day={dateObj.day}
          isSelected={selectedDate === dateObj.fullDate}
          onSelect={() => onDateSelect(dateObj.fullDate)}
          type={type}
        />
      ))}
    </div>
  );
};

export default DateList;

import style from "./filter.module.scss";
import { FaFilter, FaChevronDown } from "react-icons/fa";

type FilterProps = {
  title: string;
  data: string[];
  onSelect: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({ title, data, onSelect }) => {
  return (
    <div className={style.container}>
      <div className={style.filter_container}>
        <div className={style.filter}>
          <FaFilter className={style.icon} />
          <p className={style.title}>All {title}</p>
        </div>
        <div className={style.dropdown}>
          <select onChange={(e) => onSelect(e.target.value)}>
            <option value="">Select {title}</option>
            {data.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FaChevronDown className={style.icon} />
        </div>
      </div>
    </div>
  );
};

export default Filter;


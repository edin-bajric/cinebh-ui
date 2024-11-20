import style from "./select-dropdown.module.scss";
import { FaFilter, FaChevronDown } from "react-icons/fa";

type SelectDropdownProps = {
  title: string;
  data: string[];
  onSelect: (value: string) => void;
  selectedValue: string;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({ title, data, onSelect, selectedValue }) => {
  return (
    <div className={style.container}>
      <div className={style.filter_container}>
        <div className={style.filter}>
          <FaFilter className={style.icon} />
        </div>
        <div className={style.dropdown}>
          <select
            onChange={(e) => onSelect(e.target.value)}
            value={selectedValue}
            className={style.select}
          >
            <option value="">{`All ${title}`}</option>
            {data.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FaChevronDown className={style.dropdown_icon} />
        </div>
      </div>
    </div>
  );
};

export default SelectDropdown;

import { useState } from "react";
import style from "./filter.module.scss";
import { FaFilter, FaChevronDown } from "react-icons/fa";

type FilterProps = {
  title: string;
  data: string[];
  onSelect: (value: string) => void;
  selectedValue: string;
};

const Filter: React.FC<FilterProps> = ({
  title,
  data,
  onSelect,
  selectedValue,
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    if (!isActive) {
      setIsActive(true);
    }

    if (isActive) {
      setIsActive(false);
    }
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsActive(false);
  };

  return (
    <div className={style.container}>
      <div
        className={`${style.filter_container} ${isActive ? style.active : ""}`}
        onClick={toggleActive}
      >
        <div className={style.filter}>
          <FaFilter
            className={`${style.icon} ${isActive ? style.icon_active : ""}`}
          />
        </div>
        <div className={style.dropdown}>
          <div
            className={`${style.select} ${isActive ? style.select_active : ""}`}
          >
            {selectedValue || `All ${title}`}
          </div>
          <FaChevronDown
            className={`${style.dropdown_icon} ${
              isActive ? style.icon_active : ""
            }`}
          />
          {isActive && (
            <div className={style.dropdown_menu}>
              <div
                className={style.dropdown_item}
                onClick={() => handleSelect("")}
              >
                {`All ${title}`}
              </div>
              {data.map((item, index) => (
                <div
                  key={index}
                  className={style.dropdown_item}
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;

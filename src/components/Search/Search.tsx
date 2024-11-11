import style from "./search.module.scss";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

type SearchProps = {
  onSearch: (e: React.FormEvent) => void;
  title: string;
};

const Search: React.FC<SearchProps> = ({ onSearch, title }) => {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return (
    <div className={style.container}>
      <div className={`${style.search} ${isActive ? style.active : ""}`}>
        <form onSubmit={onSearch}>
          <button type="submit">
            <FaSearch
              className={`${style.magnifying_glass} ${isActive ? style.iconActive : ""}`}
            />
          </button>
          <input
            type="text"
            placeholder="Search Movies"
            defaultValue={title}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;

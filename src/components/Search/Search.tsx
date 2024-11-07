import style from "./search.module.scss";
import { FaSearch } from "react-icons/fa";

type SearchProps = {
  onSearch: (e: React.FormEvent) => void;
  query: string;
};

const Search: React.FC<SearchProps> = ({ onSearch, query }) => {
  return (
    <div className={style.container}>
      <div className={style.search}>
        <form onSubmit={onSearch}>
          <button type="submit">
            <FaSearch className={style.magnifying_glass} />
          </button>
          <input type="text" placeholder="Search Movies" defaultValue={query} />
        </form>
      </div>
    </div>
  );
};

export default Search;

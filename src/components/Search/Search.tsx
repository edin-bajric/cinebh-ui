import style from "./search.module.scss";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className={style.container}>
      <div className={style.search}>
        <form>
          <button type="submit">
            <FaSearch className={style.magnifying_glass}> </FaSearch>
          </button>
          <input type="text" placeholder="Search Movies" />
        </form>
      </div>
    </div>
  );
};

export default Search;

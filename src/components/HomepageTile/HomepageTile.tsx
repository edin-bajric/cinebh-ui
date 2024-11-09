import { useState } from "react";
import style from "./homepage-tile.module.scss";
import Spinner from "../Spinner";
import Error from "../Error";
import Card from "../Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  type: "movie" | "venue";
  data: any[];
  isLoading: boolean;
  isError: boolean;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  linkTo: string;
};

const HomepageTile: React.FC<Props> = ({
  title,
  type,
  data,
  isLoading,
  isError,
  totalItems,
  pageSize,
  onPageChange,
  linkTo,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * pageSize < totalItems) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, totalItems);

  const itemsToShow = end - start + 1;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p className={style.title}>{title}</p>
        <Link to={linkTo} className={style.see_all}>See All</Link>
      </div>
      <div className={style.content}>
        {data.map((item, index) => (
          <Card key={index} type={type} data={item} page="home"/>
        ))}
      </div>
      <div className={style.pagination}>
        <p>
          Showing <b>{itemsToShow}</b> out of <b>{totalItems}</b>
        </p>
        <div
          id={style.prev}
          onClick={handlePrevPage}
          className={currentPage === 0 ? style.disabled : ""}
        >
          <FaArrowLeft className={style.left} />
        </div>
        <div
          id={style.next}
          onClick={handleNextPage}
          className={end >= totalItems ? style.disabled : ""}
        >
          <FaArrowRight className={style.right} />
        </div>
      </div>
    </div>
  );
};

export default HomepageTile;

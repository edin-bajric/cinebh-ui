import { useState } from "react";
import s from "../../assets/css/homepage-tile.module.css";
import Spinner from "../Spinner";
import Error from "../Error";
import Card from "../Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  title: string;
  type: "movie" | "venue";
  data: any[];
  isLoading: boolean;
  isError: boolean;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
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
    <div id={s.container}>
      <div id={s.header}>
        <p id={s.title}>{title}</p>
        <p id={s.see_all}>See All</p>
      </div>
      <div id={s.content}>
        {data.map((item, index) => (
          <Card key={index} type={type} data={item} />
        ))}
      </div>
      <div id={s.pagination}>
        <p>
          Showing <b>{itemsToShow}</b> out of <b>{totalItems}</b>
        </p>
        <div
          id={s.prev}
          onClick={handlePrevPage}
          className={currentPage === 0 ? s.disabled : ""}
        >
          <FaArrowLeft id={s.left} />
        </div>
        <div
          id={s.next}
          onClick={handleNextPage}
          className={end >= totalItems ? s.disabled : ""}
        >
          <FaArrowRight id={s.right} />
        </div>
      </div>
    </div>
  );
};

export default HomepageTile;

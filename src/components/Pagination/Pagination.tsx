import React from "react";
import style from "./pagination.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * pageSize < totalItems) {
      onPageChange(currentPage + 1);
    }
  };

  const cumulativeEnd = Math.min((currentPage + 1) * pageSize, totalItems);

  return (
    <div className={style.pagination}>
      <p>
        Showing <b>{cumulativeEnd}</b> out of <b>{totalItems}</b>
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
        className={cumulativeEnd >= totalItems ? style.disabled : ""}
      >
        <FaArrowRight className={style.right} />
      </div>
    </div>
  );
};

export default Pagination;

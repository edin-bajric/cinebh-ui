import React, { useState } from "react";
import style from "./homepage-tile.module.scss";
import Loading from "../../Loading";
import Error from "../../Error";
import Card from "../../Card";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p className={style.title}>{title}</p>
        <Link to={linkTo} className={style.see_all} onClick={scrollToTop}>
          See All
        </Link>
      </div>
      <div className={style.content}>
        {data.map((item, index) => (
          <Card key={index} type={type} data={item} page="home" />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomepageTile;

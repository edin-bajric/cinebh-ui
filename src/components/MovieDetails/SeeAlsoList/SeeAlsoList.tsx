import React, { useState } from "react";
import style from "./see-also-list.module.scss";
import SeeAlsoCard from "../SeeAlsoCard";
import useSimilar from "../../../hooks/useSimilar";
import Loading from "../../Loading";
import Error from "../../Error";
import Pagination from "../../Pagination";

type SeeAlsoListProps = {
  movieId: string | undefined;
};

const SeeAlsoList: React.FC<SeeAlsoListProps> = ({ movieId }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const pageSize = 6;

  const { data, isLoading, isError } = useSimilar(movieId!, currentPage, pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <p>See Also</p>
        </div>
        <div className={style.see_also_list}>
          {data?.content.map((movie) => (
            <SeeAlsoCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className={style.pagination}>
          <Pagination
            currentPage={currentPage}
            totalItems={data?.totalElements || 0}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SeeAlsoList;

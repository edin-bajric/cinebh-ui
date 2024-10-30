import s from "../../assets/css/homepage-tile.module.css";
import Spinner from "../Spinner";
import Error from "../Error";

type Props = {
  title: string;
  type: "movie" | "venue";
  data: any[];
  isLoading: boolean;
  isError: boolean;
};

const HomepageTile: React.FC<Props> = ({
  title,
  type,
  data,
  isLoading,
  isError,
}) => {
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
      <div id={s.content}>cards</div>
      <div id={s.pagination}>pagination</div>
    </div>
  );
};

export default HomepageTile;

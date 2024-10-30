import s from "../../assets/css/homepage-tile.module.css";

type Props = {
    title: string;
}

const HomepageTile: React.FC<Props> = ({ title }) => {
  return (
    <div id={s.container}>
        <div id={s.header}>
            <p>{title}</p>
            <p>See All</p>
        </div>
        <div id={s.content}>
        </div>
        <div id={s.pagination}>
            
        </div>
    </div>
  )
}

export default HomepageTile
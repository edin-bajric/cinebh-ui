import style from "./see-also-card.module.scss";

const SeeAlsoCard = () => {
  return (
    <div className={style.container}>
        <div className={style.card}>
            <div className={style.image}></div>
            <div className={style.title}></div>
        </div>
    </div>
  )
}

export default SeeAlsoCard
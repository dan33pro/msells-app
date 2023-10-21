import styles from '@styles/CardDetail.module.scss';

const CardDetail = (props) => {
  const { cardDetail } = props;
  const { title, description, caracteristics, buttons } = cardDetail;

  return (
    <div className={styles.CardDetail}>
      <span className={styles.title}>{title}</span>
      <p className={styles.description}>{description}</p>
      <div className={styles.caracteristics}>
        {caracteristics.map((caracteristic) => <span>{caracteristic}</span>)}
      </div>
      <div className={styles['container-btns']}>
        {buttons.map((btn) => <button onClick={btn.handler} onKeyDown={btn.handler} className={`${styles['btn']} ${styles[`${btn.classN}`]}`}>{btn.description}</button>)}
      </div>
    </div>
  );
};

export default CardDetail;

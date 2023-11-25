import styles from '@styles/ProductCard.module.scss';
import Image from 'next/image';

const ProductCard = (props) => {
  const { cardDetail } = props;
  const { nameProduct, description, caracteristics, img } = cardDetail;

  return (
    <div className={styles.ProductCard}>
      <div className={styles['product-info']}>
        <span className={styles.nameProduct}>{nameProduct}</span>
        <p className={styles.description}>{description}</p>
        <div className={styles.caracteristics}>
          {caracteristics.map((caracteristic) => <span>{caracteristic}</span>)}
        </div>
      </div>
      <div className={styles['container-img']}>
        <Image width={80} height={80} src={img} alt />
      </div>
    </div>
  );
};

export default ProductCard;

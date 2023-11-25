import React from 'react';
import styles from '@styles/ContentPane.module.scss';
import CardDetail from '@common/CardDetail';
import ProductCard from '@common/ProductCard';

const ContentPane = (props) => {
  const { filtros, cardsDetail, cardElement } = props;

  return (
    <div className={styles.ContentPane}>
      <div className={styles.filtros}>
        {filtros != null && filtros?.length != 0 && filtros.map((filtro) => (
          <div className={styles['container-filtro']}>
            <label htmlFor={filtro.id}>{filtro.description}</label>
            <select name={filtro.description} id={filtro.id}>
              {filtro.values.map((valor) => (
                <option value={valor}>{valor}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <article className={styles.results}>
        {cardElement == 'CardDetail' && cardsDetail.map((cardDetail) => <CardDetail cardDetail={cardDetail} />)}
        {cardElement == 'ProductCard' && cardsDetail.map((cardDetail) => <ProductCard cardDetail={cardDetail} />)}
      </article>
    </div>
  );
};

export default ContentPane;

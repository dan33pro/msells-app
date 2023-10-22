import React, { useContext } from 'react';
import styles from '@styles/ContentPane.module.scss';
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
import CardDetail from '@common/CardDetail';

const ContentPane = (props) => {
  const { filtros, cardsDetail } = props;

  return (
    <div className={styles.ContentPane}>
      <div className={styles.filtros}>
        {filtros.map((filtro) => (
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
        {cardsDetail.map((cardDetail) => <CardDetail cardDetail={cardDetail} />)}
      </article>
    </div>
  );
};

export default ContentPane;

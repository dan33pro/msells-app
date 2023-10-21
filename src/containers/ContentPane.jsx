import React, { useContext } from 'react';
import styles from '@styles/ContentPane.module.scss';
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
import CardDetail from '@common/CardDetail';

const ContentPane = (props) => {
  const { filtros } = props;
  const cardDetail = {
    title: 'Nombre de la Ruta',
    description: 'Esta ruta esta asiganada al Vendedor: #ID - Nombre y Apellido y al Entregador: #ID - Nombre y Apellido',
    caracteristics: ['ID: Ruta', 'Dia/Preventa', 'Dia/Entrega'],
    buttons: [
      {
        description: 'Ver pepidos',
        classN: 'secondary',
        handler: () => {
          console.log('logica para ver pedidos');
        },
      },
      {
        description: 'Ver clientes',
        classN: 'primary',
        handler: () => {
          console.log('logica para ver clientes');
        },
      },
    ],
  };

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
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
        <CardDetail cardDetail={cardDetail} />
      </article>
    </div>
  );
};

export default ContentPane;

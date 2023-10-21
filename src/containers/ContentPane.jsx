import React, { useContext } from 'react';
import styles from '@styles/ContentPane.module.scss';

const ContentPane = (props) => {
  const { filtros } = props;

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
                
      </article>
    </div>
  );
};

export default ContentPane;

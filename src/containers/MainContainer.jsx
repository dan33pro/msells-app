import React, { useContext } from 'react';
import styles from '@styles/MainContainer.module.scss';
import SearchBar from '@common/SearchBar';
import ContentPane from './ContentPane';

const MainConatiner = (props) => {
  const { element } = props;

  return (
    <div className={styles.MainConatiner}>
      <h3 className={styles.title}>{element.title}</h3>
      {element.search && <SearchBar entidad={element.entidad} />}
      <ContentPane filtros={element.filtros} />
    </div>
  );
};

export default MainConatiner;

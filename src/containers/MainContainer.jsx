import React, { useContext } from 'react';
import styles from '@styles/MainContainer.module.scss';
import SearchBar from '@common/SearchBar';
import ContentPane from './ContentPane';

const MainConatiner = (props) => {
  const { currentView } = props;

  return (
    <div className={styles.MainConatiner}>
      <h3 className={styles.title}>{currentView.title}</h3>
      {currentView.search && <SearchBar entidad={currentView.entidad} />}
      <ContentPane filtros={currentView.filtros} cardsDetail={currentView.content} cardElement={currentView.cardElement} />
    </div>
  );
};

export default MainConatiner;

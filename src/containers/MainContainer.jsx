import React, { useContext, useEffect, useState } from 'react';
import useRutas from '@hooks/useRutas';
import styles from '@styles/MainContainer.module.scss';
import SearchBar from '@common/SearchBar';
import ContentPane from './ContentPane';

const MainConatiner = (props) => {
  const { currentView } = props;
  const [myCurrentView, setMyCurrentView] = useState(null);
  const myRouter = useRutas();

  const changeMyCurrentView = (currentView) => {
    setMyCurrentView(currentView);
  };

  useEffect(() => {
    (async () => {
      if (currentView) {
        switch(currentView.entidad) {
          case 'ruta':
            await myRouter.consultarRutas();
            changeMyCurrentView(myRouter.state.viewConsultarRutas);
            break;
        }
      }
    })();
  }, [currentView]);

  return (
    <div className={styles.MainConatiner}>
      <h3 className={styles.title}>{myCurrentView?.title}</h3>
      {myCurrentView?.search && <SearchBar entidad={myCurrentView?.entidad} />}
      <ContentPane filtros={myCurrentView?.filtros} cardsDetail={myCurrentView?.content} cardElement={myCurrentView?.cardElement} />
    </div>
  );
};

export default MainConatiner;

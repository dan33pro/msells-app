import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import styles from '@styles/MainContainer.module.scss';
import SearchBar from '@common/SearchBar';
import ContentPane from './ContentPane';

import useRutas from '@hooks/useRutas';
import useClients from '@hooks/useClients';

const MainConatiner = (props) => {
  const { state } = useContext(AppContext);

  const { currentView } = props;
  const [myCurrentView, setMyCurrentView] = useState(null);

  const myRouter = useRutas();
  const myClienter = useClients();

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
          case 'cliente':
            if(state.elements.ruta && !isNaN(state.elements.ruta)) {
              await myClienter.consultarClientesPorRuta(parseInt(state.elements.ruta));
              changeMyCurrentView(myClienter.state.viewConsultarClientes);
            }
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

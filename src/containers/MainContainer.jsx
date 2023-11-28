import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import styles from '@styles/MainContainer.module.scss';
import SearchBar from '@common/SearchBar';
import ContentPane from './ContentPane';

import useRutas from '@hooks/useRutas';
import useClients from '@hooks/useClients';
import useOrders from '@hooks/useOrders';
import useSesion from '@hooks/useSesion';
import useProduct from '@hooks/useProduct';

const MainConatiner = (props) => {
  const { state } = useContext(AppContext);
  const { getID } = useSesion();

  const { currentView } = props;
  const [myCurrentView, setMyCurrentView] = useState(null);

  const myRouter = useRutas();
  const myClienter = useClients();
  const myOrderer = useOrders();
  const myProduct = useProduct();

  const changeMyCurrentView = (currentView) => {
    setMyCurrentView(currentView);
  };

  useEffect(() => {
    (async () => {
      if (currentView) {
        switch(currentView.entidad) {
          case 'ruta':
            let id = getID();
            let rol = state.idRol;
            if (rol == 1) {
              await myRouter.consultarRutas();
            } else if (rol == 2 || rol == 3) {
              await myRouter.consultarRutasVendedorEntregador(rol, id);
            }

            changeMyCurrentView(myRouter.state.viewConsultarRutas);
            break;
          case 'cliente':
            if(state.elements.ruta && !isNaN(state.elements.ruta)) {
              await myClienter.consultarClientesPorRuta(parseInt(state.elements.ruta), state.idRol);
              changeMyCurrentView(myClienter.state.viewConsultarClientes);
            }
            break;
          case 'pedido':
            if(state.elements.ruta && !isNaN(state.elements.ruta)) {
              await myOrderer.consultarPedidosPorRuta(parseInt(state.elements.ruta));
              changeMyCurrentView(myOrderer.state.viewConsultarPedidos);
            }
            break;
          case 'producto':
            await myProduct.consultarProductos();
            changeMyCurrentView(myProduct.state.viewConsultarProductos);
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

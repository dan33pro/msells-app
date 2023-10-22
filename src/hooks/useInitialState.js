import { useState } from 'react';

const initialState = {
  isViewMenuDesktop: false,
  isViewMenuMobile: false,
  viewConsultarRutas: {
    title: 'Consultar Rutas',
    stateView: true,
    entidad: 'ruta',
    search: true,
    filtros: [
      {
        id: 'filtro-1',
        description: 'Dia/Preventa',
        values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      },
      {
        id: 'filtro-2',
        description: 'Dia/Entrega',
        values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      },
    ],
  },
  user: 'Daniel Cespedes',
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const toggleMenuDesktop = (newState) => {
    setState({
      ...state,
      isViewMenuDesktop: newState,
    });
  };

  const toggleMenuMobile = (newState) => {
    setState({
      ...state,
      isViewMenuMobile: newState,
    });
  };

  const toggleConsultarRutas = (newState) => {
    setState({
      ...state,
      viewConsultarRutas: {
        ...state.viewConsultarRutas,
        stateView: newState,
      },
    });
  };

  const changeUser = (nameUser) => {
    setState({
      ...state,
      user: nameUser,
    });
  };

  return {
    state,
    toggleMenuDesktop,
    toggleMenuMobile,
    changeUser,
    toggleConsultarRutas,
  };
};

export default useInitialState;

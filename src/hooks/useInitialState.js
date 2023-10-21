import { useState } from 'react';

const initialState = {
  stateViewMenuNav: false,
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

  const toggleMenuNav = (newState) => {
    setState({
      ...state,
      stateViewMenuNav: newState,
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
    toggleMenuNav,
    changeUser,
    toggleConsultarRutas,
  };
};

export default useInitialState;

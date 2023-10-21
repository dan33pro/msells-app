import { useState } from 'react';

const initialState = {
  stateViewMenuNav: false,
  viewConsultarRutas: true,
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
      viewConsultarRutas: newState,
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
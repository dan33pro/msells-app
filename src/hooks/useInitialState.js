import { useState } from 'react';

const initialState = {
  stateViewMenuNav: false,
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
  };
};

export default useInitialState;
import { useState } from 'react';

class Filtro {
  constructor({id, description, values}) {
    this.id = typeof id == 'string' ? id : null;
    this.description = typeof description == 'string' ? description : null;
    this.values = Array.isArray(values)  ? values : null;
  }
}
class View {
  constructor({title, stateView, entidad, search}) {
    this.title = typeof title == 'string' ? title : null;
    this.stateView = typeof stateView == 'boolean' ? stateView : null;
    this.entidad = typeof entidad == 'string' ? entidad : null;
    this.search = typeof search == 'boolean' ? search : null;
    this.filtros = [];
  }

  addFilter(filter) {
    if(filter instanceof Filtro) {
      this.filtros.push(filter);
    }
  }

  set setStateView(newState) {
    this.stateView = newState;
  }
}

const filter1 = new Filtro({id: 'filtro-1', description: 'Dia/Preventa', values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']});
const filter2 = new Filtro({id: 'filtro-2', description: 'Dia/Entrega', values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']});
const viewConsultarRutas = new View({title:'Consultar Rutas', stateView:false, entidad:'ruta', search:true});
viewConsultarRutas.addFilter(filter1);
viewConsultarRutas.addFilter(filter2);

const initialState = {
  isViewMenuDesktop: false,
  isViewMenuMobile: false,
  viewConsultarRutas: viewConsultarRutas,
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
    state.viewConsultarRutas.stateView = newState;
    setState({
      ...state,
    })
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

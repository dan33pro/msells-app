import { useState } from 'react';
import { View, Card, Button } from '@hooks/useEntidades';
import routeService from '@services/api/routeService';

// Filtros
// const filter1 = new Filtro({ id: 'filtro-1', description: 'Dia/Preventa', values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'] });
// const filter2 = new Filtro({ id: 'filtro-2', description: 'Dia/Entrega', values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'] });

// Vistas
const viewConsultarRutas = new View({ title: 'Consultar Rutas', stateView: true, entidad: 'ruta', search: true, cardElement: 'CardDetail' });
// viewConsultarRutas.addFilters([filter1, filter2]);

// Botones
const btnWatchPedidos = new Button({
  description: 'Ver pedidos',
  classN: 'secondary',
});
const btnWatchClientes = new Button({
  description: 'Ver clientes',
  classN: 'primary',
});

const routesState = {
  viewConsultarRutas: viewConsultarRutas,
};

const useRutas = () => {
  const [state, setState] = useState(routesState);

  const changeState = (newState) => {
    setState({
      ...newState,
    })
  };

  const updateViewConsultarRutas = (rutas) => {
    state.viewConsultarRutas.removeContent();
    rutas.forEach((ruta) => {
      let card = new Card({
        title: ruta.nombre_ruta,
        description: `Esta ruta esta asignada al vendedor con ID: ${ruta.id_vendedor} y al Entregador con ID: ${ruta.id_entregador}`,
        caracteristics: [`ID-Ruta: ${ruta.id_ruta}`],
      });
      card.addButtons([btnWatchPedidos, btnWatchClientes]);
      state.viewConsultarRutas.addContent(card);
    });

    changeState(state);
  };

  const consultarRutas = async () => {
    let response = await routeService.obtenerRutas();

    if (response.success) {
      updateViewConsultarRutas(response.data.body)
    }
  };

  return {
    state,
    consultarRutas,
  };
};

export default useRutas;

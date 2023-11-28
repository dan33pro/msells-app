import { useState } from 'react';
import { View, Card, Button } from '@hooks/useEntidades';
import clientService from '@services/api/clientService';

// Vista
const viewConsultarClientes = new View({ title: 'Consultar Clientes', stateView: false, entidad: 'cliente', search: true, cardElement: 'CardDetail' });

// Botones
const btnNuevaFactura = new Button({
  description: 'Nueva Factura',
  classN: 'primary',
});

const clientsState = {
  viewConsultarClientes: viewConsultarClientes,
};

const useClients = () => {
  const [state, setState] = useState(clientsState);

  const changeState = (newState) => {
    setState({
      ...newState,
    })
  };

  const updateViewConsultarClientes = (clients, idRol) => {
    state.viewConsultarClientes.removeContent();
    clients.forEach((client) => {
      let card = new Card({
        title: client.nombres + ' ' + client.apellidos,
        description: `Puede contactar al cliente a través de: Correo: ${client.correo} - Número: +${client.codPais} ${client.numeroCelular}`,
        caracteristics: [`ID-Ruta: ${client.id_ruta}`, `ID-Cliente: ${client.id_cliente}`, `Dirección: ${client.direccion}`],
      });
      if (idRol == 2) {
        card.addButtons([btnNuevaFactura]);
      }
      state.viewConsultarClientes.addContent(card);
    });

    changeState(state);
  };

  const consultarClientes = async () => {
    let response = await clientService.obtenerClientes();

    if (response.success) {
      updateViewConsultarClientes(response.data.body)
    }
  };

  const consultarClientesPorRuta = async (idRuta, idRol) => {
    let query = {
      key: 'id_ruta',
      value: idRuta,
    }
    let response = await clientService.obtenerClientesPorAtributo(query);

    if (response.success) {
      updateViewConsultarClientes(response.data.body, idRol)
    }
  };

  return {
    state,
    consultarClientes,
    consultarClientesPorRuta,
  };
};

export default useClients;

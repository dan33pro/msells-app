import { useState } from 'react';
import { View, Card, Button } from '@hooks/useEntidades';
import orderService from '@services/api/orderService';
import clientService from '@services/api/clientService';

// Vista
const viewConsultarPedidos = new View({ title: 'Consultar Pedidos', stateView: false, entidad: 'pedido', search: true, cardElement: 'CardDetail' });

// Botón
const btnWatchPedido = new Button({
  description: 'Ver Pedido',
  classN: 'primary',
});

const ordersState = {
  viewConsultarPedidos: viewConsultarPedidos,
};

const useOrders = () => {
  const [state, setState] = useState(ordersState);

  const changeState = (newState) => {
    setState({
      ...newState,
    })
  };

  const updateViewConsultarPedidos = (clients) => {
    state.viewConsultarPedidos.removeContent();
    clients.forEach((client) => {
      if(client) {
        let card = new Card({
          title: client.nombres + ' ' + client.apellidos,
          description: `Puede contactar al cliente a través de: Correo: ${client.correo} - Número: +${client.codPais} ${client.numeroCelular}`,
          caracteristics: [`ID-Pedido: ${client.id_pedido}`, `ID-Cliente: ${client.id_cliente}`, `ID-Ruta: ${client.id_ruta}`, `Dirección: ${client.direccion}`],
        });
        card.addButtons([btnWatchPedido]);
        state.viewConsultarPedidos.addContent(card);
      }
    });

    changeState(state);
  };

  const consultarPedido = async (idPedido) => {
    let orders = await orderService.obtenerPedido(idPedido);

    if (orders.success) {
      let pedido = orders.data.body[0];
      return pedido;
    }

    return null;
  };

  const consultarPedidos = async () => {
    let clientes = await clientService.obtenerClientes();

    if (clientes.success) {
      let orders = await orderService.obtenerPedidos();
      if (orders.success) {
        let clientesConPedido = orders.data.body.map((order) => {
          if(clientes.data.body.some((cliente) => cliente.id_cliente == order.id_cliente)) {
            return {
              ...clientes.data.body.find((cliente) => cliente.id_cliente == order.id_cliente),
              id_pedido: order.id_pedido,
            };
          }
        });
        updateViewConsultarPedidos(clientesConPedido);
      }
    }
  };

  const consultarPedidosPorRuta = async (idRuta) => {
    let query = {
      key: 'id_ruta',
      value: idRuta,
    }
    let clientes = await clientService.obtenerClientesPorAtributo(query);

    if (clientes.success) {
      let orders = await orderService.obtenerPedidosPorAtributo({ key: 'id_estado', value: '1'});
      if(orders.success) {
        let clientesConPedido = orders.data.body.map((order) => {
          if(clientes.data.body.some((cliente) => cliente.id_cliente == order.id_cliente)) {
            return {
              ...clientes.data.body.find((cliente) => cliente.id_cliente == order.id_cliente),
              id_pedido: order.id_pedido,
            };
          }
        });
        updateViewConsultarPedidos(clientesConPedido);
      }
    }
  };

  return {
    state,
    consultarPedido,
    consultarPedidos,
    consultarPedidosPorRuta,
  };
};

export default useOrders;

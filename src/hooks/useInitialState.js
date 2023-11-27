import { useState } from 'react';
import { View, Filtro, Card, Button, CardProduct} from '@hooks/useEntidades';

// Filtros
const filter1 = new Filtro({ id: 'filtro-1', description: 'Dia/Preventa', values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'] });
const filter2 = new Filtro({ id: 'filtro-2', description: 'Dia/Entrega', values: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'] });
const filter3 = new Filtro({ id: 'filtro-3', description: 'Tipo de Producto', values: ['Dulcería', 'Aseo', 'Abarrotes'] });
const filter4 = new Filtro({ id: 'filtro-4', description: 'Empresa', values: ['Colombina', 'Super', 'Italo', 'Americandy', 'Quala'] });

// Vistas
const viewConsultarRutas = new View({ title: 'Consultar Rutas', stateView: true, entidad: 'ruta', search: true, cardElement: 'CardDetail' });
viewConsultarRutas.addFilters([filter1, filter2]);

const viewConsultarPedidos = new View({ title: 'Consultar Pedidos', stateView: false, entidad: 'pedido', search: true, cardElement: 'CardDetail' });

const viewConsultarClientes = new View({ title: 'Consultar Clientes', stateView: false, entidad: 'cliente', search: true, cardElement: 'CardDetail' });

const viewConsultarProductos = new View({ title: 'Consultar Productos', stateView: false, entidad: 'producto', search: true, cardElement: 'ProductCard' });
viewConsultarProductos.addFilters([filter3, filter4]);

// Botones
const btnWatchPedidos = new Button({
  description: 'Ver pedidos',
  classN: 'secondary',
});
const btnWatchClientes = new Button({
  description: 'Ver clientes',
  classN: 'primary',
});
const btnWatchPedido = new Button({
  description: 'Ver Pedido',
  classN: 'primary',
});
const btnEditarFactura = new Button({
  description: 'Editar Factura',
  classN: 'secondary',
});
const btnNuevaFactura = new Button({
  description: 'Nueva Factura',
  classN: 'primary',
});

// Cards
const cardDetailRutaExample = new Card({
  title: 'Nombre de la Ruta',
  description: 'Esta ruta esta asiganada al Vendedor: #ID - Nombre y Apellido y al Entregador: #ID - Nombre y Apellido',
  caracteristics: ['ID: Ruta', 'Dia/Preventa', 'Dia/Entrega'],
});
cardDetailRutaExample.addButtons([btnWatchPedidos, btnWatchClientes]);

const cardDetailPedidoExample = new Card({
  title: 'Nombres y Apellidos del Cliente',
  description: 'Puede contactar al cliente a través de: Correo: ducart@outlook.com - Número: 3155679568',
  caracteristics: ['CC: 1002480261', 'Dirección: Carrera 24 #5-55',],
});
cardDetailPedidoExample.addButtons([btnWatchPedido,]);

const cardCliente = new Card({
  title: 'Nombres y Apellidos del Cliente',
  description: 'Puede contactar al cliente a través de: Correo: ducart@outlook.com - Número: 3155679568',
  caracteristics: ['CC: 1002480261', 'Dirección: Carrera 24 #5-55',],
});
cardCliente.addButtons([btnEditarFactura, btnNuevaFactura]);

// Product Card
import productImage from '@images/product_image.svg'; 
const productCardForList = new CardProduct({
  nameProduct: 'Nombre de un producto',
  description: 'La descripción de un producto, desde tipo unidades por produto, y tipo de presentación.',
  caracteristics: ['ID: Producto', 'Tipo/producto ', 'Empresa: Nombre'],
  img: productImage,
});

// Añadir cards
for (let i = 0; i < 20; i++ ) {
  viewConsultarRutas.addContent(cardDetailRutaExample);
  viewConsultarPedidos.addContent(cardDetailPedidoExample);
  viewConsultarClientes.addContent(cardCliente);
  viewConsultarProductos.addContent(productCardForList);
}

const initialState = {
  isViewMenuDesktop: false,
  isViewMenuMobile: false,
  isViewPedidoDetail: false,

  isViewOCDevivery: false,
  isViewOCMixta: false,
  isViewORAdmin: false,
  isViewORVendedor: false,

  viewConsultarRutas: viewConsultarRutas,
  viewConsultarPedidos: viewConsultarPedidos,
  viewConsultarClientes: viewConsultarClientes,
  viewConsultarProductos: viewConsultarProductos,

  elements: {
    ruta: null,
    pedido: null,
    client: null,
  },
  user: 'Daniel Cespedes',
  sesion: false,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const changeSesionState = (newState) => {
    setState({
      ...state,
      sesion: newState,
    });
  };

  const toggleOCD = (newState) => {
    setState({
      ...state,
      isViewOCDevivery: newState,
    });
  };

  const toggleOCM = (newState) => {
    setState({
      ...state,
      isViewOCMixta: newState,
    });
  };

  const toggleORA = (newState) => {
    setState({
      ...state,
      isViewORAdmin: newState,
    });
  };

  const toggleORV = (newState) => {
    setState({
      ...state,
      isViewORVendedor: newState,
    });
  };

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

  const togglePedidoDetail = (newState) => {
    setState({
      ...state,
      isViewPedidoDetail: newState,
    });
  };

  const toggleConsultarRutas = (newState) => {
    state.viewConsultarRutas.stateView = newState;
    setState({
      ...state,
    });
  };

  const toggleConsultarPedidos = (newState) => {
    state.viewConsultarPedidos.stateView = newState;
    setState({
      ...state,
    });
  };

  const toggleviewConsultarClientes = (newState) => {
    state.viewConsultarClientes.stateView = newState;
    setState({
      ...state,
    });
  };

  const toggleviewConsultarProductos = (newState) => {
    state.viewConsultarProductos.stateView = newState;
    setState({
      ...state,
    });
  };

  const changeUser = (nameUser) => {
    setState({
      ...state,
      user: nameUser,
    });
  };

  const changeCurrentRuta = (idRuta) => {
    state.elements.ruta = idRuta;
    setState({
      ...state,
    });
  };

  const changeCurrentCliente = (client) => {
    state.elements.client = client;
    setState({
      ...state,
    });
  };

  const changeCurrentPedido = (idPedido) => {
    state.elements.pedido = idPedido;
    setState({
      ...state,
    });
  };

  return {
    state,
    toggleMenuDesktop,
    toggleMenuMobile,
    togglePedidoDetail,
    changeUser,
    toggleConsultarRutas,
    toggleConsultarPedidos,
    toggleviewConsultarClientes,
    toggleviewConsultarProductos,
    changeCurrentRuta,
    changeCurrentCliente,
    changeCurrentPedido,
    toggleOCD,
    toggleOCM,
    toggleORA,
    toggleORV,
    changeSesionState,
  };
};

export default useInitialState;

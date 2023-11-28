import axios from 'axios';
import userStorage from './userStorage';

const API_URL = 'http://34.16.138.227:3103';

const orderDetailService = {
  registrarDetallePedido: async (orderDetailData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.post(`${API_URL}/api/order_detail/`, orderDetailData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        console.error('error al registrar el detalle del pedido: ');
      }
    } catch (error) {
      console.error('Error acceso a los datos', error);
      console.log('Error response', error.response); 

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  editarDetallePedido: async (orderDetailData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.put(`${API_URL}/api/order_detail/`, orderDetailData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        console.error('Error al editar el detalle del pedido', response.status, response.data);
      }
    } catch (error) {
      console.error('Error al editar el detalle del pedido', error);

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerDetallesPedidos: async () => {
    let { token } = userStorage.getUserData();

    try {
      const response = await axios.get(`${API_URL}/api/order_detail/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al obtener la informacion de los detalles de los pedidos');
      }
    } catch (error) {
      console.error('Error en la respuesta', error);
      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerDetallePedido: async (idProducto, idPedido) => {
    let { token } = userStorage.getUserData();
    if ( !token ) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyLCJ1c2VyUGFzc3dvcmQiOiIkMmIkMDUkaFRSY0MyT1l2ZC5IUVo1akF0NlhZdUtQZjNDZnI3R3lNUXVRLnNVRHMzaUkwbG5TeXhObnEiLCJpYXQiOjE3MDA1MjkzNTd9.Pz7-2XxL9d85PdD9Eeea6am8YF-pOOSwORy6yWWomP8';
    }
    try {
      const response = await axios.get(`${API_URL}/api/order_detail/${idProducto}/${idPedido}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al obtener el detalle del pedido');
      }
    } catch (error) {
      console.error('Error en la respuesta', error);
      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerDetallesPedidosPorAtributo: async (query) => {
    const { key, value } = query;
    let { token } = userStorage.getUserData();
    if ( !token ) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyLCJ1c2VyUGFzc3dvcmQiOiIkMmIkMDUkaFRSY0MyT1l2ZC5IUVo1akF0NlhZdUtQZjNDZnI3R3lNUXVRLnNVRHMzaUkwbG5TeXhObnEiLCJpYXQiOjE3MDA1MjkzNTd9.Pz7-2XxL9d85PdD9Eeea6am8YF-pOOSwORy6yWWomP8';
    }
    try {
      const response = await axios.get(`${API_URL}/api/order_detail/query/${key}/${value}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al obtener los detalles de los pedidos o el pedido');
      }
    } catch (error) {
      console.error('Error en la respuesta', error);
      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  deletePedido: async (idProducto, idPedido, data) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.delete(`${API_URL}/api/order_detail/${idProducto}/${idPedido}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al eliminar el detalle del pedido');
      }
    } catch (error) {
      console.error('Error al eliminar', error);
      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

};

export default orderDetailService;

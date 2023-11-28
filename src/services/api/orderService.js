import axios from 'axios';
import userStorage from './userStorage';

const API_URL = 'http://34.16.138.227:3103';

const orderService = {
  registrarPedido: async (orderData) => {
    const { token } = userStorage.getUserData();

    try {
      const response = await axios.post(`${API_URL}/api/order`, orderData, {
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
        console.error('error al registrar el pedido: ');
      }
    } catch (error) {
      console.error('Error acceso a los datos', error);

      return {
        success: false,
        message: error.message,
        status: error?.status,
        data: error.response?.data,
      };
    }
  },

  editarPedido: async (orderData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.put(`${API_URL}/api/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 201) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        console.error('Error al editar el pedido', response.status, response.data);
      }
    } catch (error) {
      console.error('Error al editar el pedido', error);

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerPedidos: async () => {
    let { token } = userStorage.getUserData();

    try {
      const response = await axios.get(`${API_URL}/api/order`, {
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
        console.error('Error al obtener la informacion de los pedidos');
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

  obtenerPedido: async (idPedido) => {
    let { token } = userStorage.getUserData();
    if ( !token ) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxOSwidXNlclBhc3N3b3JkIjoiJDJiJDA1JFAxY3dDbkcvTkN1R1FPRFlDRkF1RS56UVFOU3pnTWdmTGJjbWNRaE1OQm9NeU5waDIxdlRHIiwiaWF0IjoxNzAwMzQ4NjM3fQ.5_l8L8cUeVJitQsIeI8hVdH2MQEvGD7mb9EFFzYaDMQ';
    }
    try {
      const response = await axios.get(`${API_URL}/api/order/${idPedido}/`, {
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
        console.error('Error al obtener la informacion del pedido');
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

  obtenerPedidosPorAtributo: async (query) => {
    const { key, value } = query;
    let { token } = userStorage.getUserData();
    if ( !token ) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxOSwidXNlclBhc3N3b3JkIjoiJDJiJDA1JFAxY3dDbkcvTkN1R1FPRFlDRkF1RS56UVFOU3pnTWdmTGJjbWNRaE1OQm9NeU5waDIxdlRHIiwiaWF0IjoxNzAwMzQ4NjM3fQ.5_l8L8cUeVJitQsIeI8hVdH2MQEvGD7mb9EFFzYaDMQ';
    }
    try {
      const response = await axios.get(`${API_URL}/api/order/${key}/${value}/`, {
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
        console.error('Error al obtener la informacion de los pedidos');
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

  deletePedido: async (idOrder) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.delete(`${API_URL}/api/order/${idOrder}/`, {
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
        console.error('Error al eliminar el pedido');
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

export default orderService;

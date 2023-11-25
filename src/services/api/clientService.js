import axios from 'axios';
import userStorage from './userStorage';

const API_URL = '';

const clientService = {
  registrarCliente: async (clientData) => {
    const { token } = userStorage.getUserData();

    try {
      const response = await axios.post(`${API_URL}/api/client`, clientData, {
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
        console.error('error al registrar el cliente: ');
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

  editarCliente: async (clientData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.put(`${API_URL}/api/client`, clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        console.error('Error al editar el cliente', response.status, response.data);
      }
    } catch (error) {
      console.error('Error al editar el cliente', error);

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerClientes: async () => {
    let { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/client`, {
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
        console.error('Error al obtener la informacion de los clientes');
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

  obtenerCliente: async (idClient) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/client/${idClient}/`, {
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
        console.error('Error al obtener la informacion del cliente');
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

  obtenerClientesPorAtributo: async (query) => {
    const { key, value } = query;
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/client/${key}/${value}/`, {
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
        console.error('Error al obtener la informacion de los clientes');
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

  deleteClient: async (idClient) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.delete(`${API_URL}/api/client/${idClient}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al eliminar el cliente');
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
  obtenerRutas: async () => {

    const { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/route`, {
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
        console.error('Error al obtener las rutas');
      }
    } catch (error) {
      console.error('error en la solicitud');
      return {
        success: false,
        message: error.message,
        status: error.status,
        data: error.response?.data,
      };
    }
  },
};

export default clientService;

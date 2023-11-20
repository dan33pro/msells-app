import axios from 'axios';
import userStorage from './userStorage';

const API_URL = 'http://localhost:3000';

const clientService = {
  registrarCliente: async (userData) => {
    const { token } = userStorage.getUserData();

    try {
      const response = await axios.post(`${API_URL}/api/client`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response === 200) {
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

  obtenerRutas: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/routes`);
      if (response === 200) {
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

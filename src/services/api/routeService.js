import axios from 'axios';
import userStorage from './userStorage';

const API_URL = 'http://34.16.138.227:3103';

const routeService = {
  registrarRuta: async (routeData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.post(`${API_URL}/api/route`, routeData, {
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
        console.error('Error al registrar la ruta', response.status, response.data);
      }
    } catch (error) {
      console.error('Error al registrar la ruta', error);

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  editarRuta: async (routeData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.put(`${API_URL}/api/route`, routeData, {
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
        console.error('Error al editar la ruta', response.status, response.data);
      }
    } catch (error) {
      console.error('Error al editar la ruta', error);

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerRutas: async () => {
    let { token } = userStorage.getUserData();
    if ( !token ) {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxOSwidXNlclBhc3N3b3JkIjoiJDJiJDA1JFAxY3dDbkcvTkN1R1FPRFlDRkF1RS56UVFOU3pnTWdmTGJjbWNRaE1OQm9NeU5waDIxdlRHIiwiaWF0IjoxNzAwMzQ4NjM3fQ.5_l8L8cUeVJitQsIeI8hVdH2MQEvGD7mb9EFFzYaDMQ';
    }
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
        console.error('Error al obtener la informacion de las rutas');
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

  obtenerRuta: async (idRoute) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/route/${idRoute}/`, {
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
        console.error('Error al obtener la informacion de la ruta');
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

  obtenerRutasPorAtributo: async (query) => {
    const { key, value } = query;
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/route/${key}/${value}/`, {
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
        console.error('Error al obtener la informacion de las rutas');
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

  deleteRuta: async (idRoute) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.delete(`${API_URL}/api/route/${idRoute}/`, {
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
        console.error('Error al eliminar la ruta');
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

export default routeService;

import axios from 'axios';

const API_URL = 'http://34.16.138.227:3102';
const API_ROL = 'http://34.16.138.227:3101';

const usuarioService = {
  registrarUsuario: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/user`, userData);
      if(response.status === 201){
      return {
        success: true,
        data: response.data,
      };
    }else{
      console.error('error al registrar el usuario'); 
    }
    } catch (error) {
      console.error('Error al registrar el usuario', error);

      return {
        success: false,
        message: error.message,
        status: error?.status,
        data: error.response?.data,
      };
    }
  },

  obtenerRol: async () => {
    try {
      const response = await axios.get(`${API_ROL}/Roles`);
      if (response.status === 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al obtener la informacion del rol');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      return {
        success: false,
        message: error.message,
        status: error.status,
        data: error.response?.data,
      };
    }
  },



};

export default usuarioService;

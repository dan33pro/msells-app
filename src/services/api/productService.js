import axios from 'axios';

const API_URL = 'http://localhost:3000';

const productService = {
  registrarProducto: async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/api/productos`, productData);

      if (response === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        console.error('Error al registrar el producto', response.status, response.data);
      }
    } catch (error) {
      console.error('Error al registrar el producto', error);

      return {
        success: false,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
  },
  obtenerTipoProducto: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tiposProducto`);
      if (response.status === 200) {
        const data = response.data;
        return {
          success: true,
          data,
        };
      } else {
        console.error('Error al obtener la informacion de tipo producto');
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
};

export default productService;

import axios from 'axios';
import userStorage from './userStorage';

const API_URL = 'http://34.16.138.227:3103';

const productService = {
  registrarProducto: async (productData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.post(`${API_URL}/api/product`, productData, {
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

  obtenerProducto: async (idProducto) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/product/${idProducto}/`, {
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
        console.error('Error al obtener la informacion del producto');
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

  obtenerTipoProducto: async () => {

    const {token} = userStorage.getUserData(); 

    try {
      const response = await axios.get(`${API_URL}/api/product_type`, {
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

  obtenerProductoNombre: async (nombre) => {
    const {
      token
    } = userStorage.getUserData();
    try {
      const response = await axios.get(`${API_URL}/api/product/nombre/${nombre}/`, {
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
        console.error('Error al obtener la informacion del producto');
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

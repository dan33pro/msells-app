import axios from 'axios';
import userStorage from './userStorage';

const API_URL = 'http://34.16.138.227:3103';

const productService = {
  registrarProducto: async (productData) => {
    const { token } = userStorage.getUserData();
    try {
      const response = await axios.post(`${API_URL}/api/productos`, productData, {
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
      const response = await axios.get(`${API_URL}/api/product_type`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VyUGFzc3dvcmQiOiIkMmIkMDUkM0JrbFU3UDZ1WTRCOTZFdVVuSFZBdVNMeEVmRi9kVVV2cVpzalZXcDFNWnhHcC9FVWZtdE8iLCJpYXQiOjE3MDA0NTU4NTR9.PfKu3L9U66F2JTC11oDZEf1opB2WSAOE8EidrM8bokE"}`,
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
};

export default productService;

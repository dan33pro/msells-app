import axios from 'axios';
import UserStorage from './userStorage'; 


const API_URL = 'http://localhost:3000';

const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

    if (response === 200) {
      const { token, id_rol } = response.data.body;

      
      UserStorage.saveToken(token); 

      const datosUsuario = await consultarUsuarioPorCorreo(email); 
      if(datosUsuario){
        UserStorage.saveidUser(datosUsuario.idUsuario); 
        UserStorage.saveNombre(datosUsuario.nombres); 
        UserStorage.saveApellido(datosUsuario.apellidos); 
        UserStorage.saveCorreo(datosUsuario.correo); 
        UserStorage.saveTelefono(datosUsuario.telefono); 
        UserStorage.saveRol(datosUsuario.id_rol); 
      }

      if (id_rol === 1) {
        window.location.href = './indexAdmin.js';
      } else if (id_rol === 2) {
        window.location.href = './indexVendedor.js';
      } else if (id_rol === 3) {
        window.location.href = './indexDelivery.js';
      }
      return {
        success: true,
        token,
        id_rol,
      };
    } else {
      return {
        success: false,
        message: response.data.body.error,
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error en la solicitud', error);

    if (error.response) {
      console.error('Error en la respuesta: ', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('no se recibio la respuesta del servidor');
    } else {
      console.error('Error en la configuracion de la solicitud: ', error.message);
    }

    return {
      success: false,
      message: 'Error en la solicitud',
    };
  }
};

const consultarUsuarioPorCorreo = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/consultarUsuario`, {
      params: { email },
    });

    if (response === 200) {
      return response.data.body;
    } else {
      console.error('Error al consultar el usuario', response.status, response.data);
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud para consultar el usuario', error);
    return null;
  }
};


export default loginService;

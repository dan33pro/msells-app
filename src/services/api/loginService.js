import axios from 'axios';
import UserStorage from './userStorage';

const API_URL = 'http://34.16.138.227:3102';

const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { correo: email, userPassword: password });

    if (response.status === 200) {
      const { token, id_rol } = response.data.body;

      UserStorage.saveToken(token);

      const datosUsuario = await consultarUsuarioPorCorreo(email);
      if (datosUsuario) {
        
        UserStorage.saveidUser(datosUsuario.id_usuario);
        UserStorage.saveNombre(datosUsuario.nombres);
        UserStorage.saveApellido(datosUsuario.apellidos);
        UserStorage.saveCorreo(datosUsuario.correo);
        UserStorage.saveTelefono(datosUsuario.numeroCelular);
        UserStorage.saveRol(datosUsuario.id_rol);
      }
      if (id_rol === 1) {
        window.location.href = './main';
      } else if (id_rol === 2) {
        window.location.href = './main';
      } else if (id_rol === 3) {
        window.location.href = './main';
      }
      return {
        success: true,
        token,
        id_rol,
      };
    } else {
      alert('no se pudo acceder');
      return {
        success: false,
        message: response.data.body.message,
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error en la solicitud', error);

    return {
      success: false,
      message: 'Error en la solicitud',
    };
  }
};

const consultarUsuarioPorCorreo = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/correo/${email}`); 
   
    if (response.status === 200 && response.data.error === false) {
      const userDataArray = response.data.body;
      if (userDataArray.length > 0) {
        const userData = userDataArray[0];

        return {
          id_usuario: userData.id_usuario,
          nombres: userData.nombres,
          apellidos: userData.apellidos,
          correo: userData.correo,
          numeroCelular: userData.numeroCelular,
          id_rol: userData.id_rol,
        };
      }else{
        console.error('no se encontro un usuario con el correo proporcionado'); 
        return null; 
      }
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
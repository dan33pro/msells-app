import userStorage from '@services/api/userStorage';

const useSesion = () => {
  const validSesion = () => {
    const { token, id_rol, id_usuario } = userStorage.getUserData();
    if ((token && id_rol, id_usuario)) {
      return true;
    }

    return false;
  };

  const getID = () => {
    const { id_usuario } = userStorage.getUserData();
    if ((id_usuario)) {
      return id_usuario;
    }

    return 0;
  };

  return { validSesion, getID };
};

export default useSesion;

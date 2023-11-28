import userStorage from '@services/api/userStorage';

const useSesion = () => {
  const validSesion = () => {
    const { token, rol } = userStorage.getUserData();
    if ((token && rol)) {
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

  const getUserData = () => {
    const { token, rol, nombres } = userStorage.getUserData();
    if ((token && rol && nombres)) {
      return {
        rol,
        nombres,
      };
    }

    return null;
  };

  return { validSesion, getID, getUserData };
};

export default useSesion;

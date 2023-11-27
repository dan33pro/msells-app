import userStorage from '@services/api/userStorage';

const useSesion = () => {
  const validSesion = () => {
    const { token, id_rol, id_usuario } = userStorage.getUserData();
    if ((token && id_rol, id_usuario)) {
      return true;
    }

    return false;
  };

  return { validSesion };
};

export default useSesion;

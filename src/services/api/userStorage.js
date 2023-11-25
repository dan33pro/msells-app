

class userStorage {


  static saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static saveidUser(id_usuario) {
    localStorage.setItem('id_usuario', JSON.stringify(id_usuario));
  }

  static saveNombre(nombre) {
    localStorage.setItem('nombres', JSON.stringify(nombre));
  }

  static saveApellido(apellido) {
    localStorage.setItem('apellidos', JSON.stringify(apellido));
  }
  static saveCorreo(correo) {
    localStorage.setItem('correo', JSON.stringify(correo));
  }

  static saveTelefono(telefono) {
    localStorage.setItem('numeroCelular', JSON.stringify(telefono));
  }

  static saveRol(id_rol) {
    localStorage.setItem('id_rol', JSON.stringify(id_rol));
  }

  static clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nombres');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('correo');
    localStorage.removeItem('numeroCelular');
    localStorage.removeItem('id_rol');
  }

  static getUserData() {
    return {
      token: JSON.parse(localStorage.getItem('token')),
      id_usuario: parseInt(localStorage.getItem('id_usuario')),
      nombres: JSON.parse(localStorage.getItem('nombres')),
      apellidos: JSON.parse(localStorage.getItem('apellidos')),
      correo: JSON.parse(localStorage.getItem('correo')),
      numeroCelular: JSON.parse(localStorage.getItem('numeroCelular')),
      rol: parseInt(localStorage.getItem('id_rol')),
    };
  }
}


export default userStorage; 

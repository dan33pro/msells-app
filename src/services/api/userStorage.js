class userStorage {


  static saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static saveidUser(id_usuario) {
    localStorage.setItem('id_usuario', JSON.stringify(id_usuario));
  }

  static saveNombre(nombre) {
    localStorage.setItem('nombre', JSON.stringify(nombre));
  }

  static saveApellido(apellido) {
    localStorage.setItem('apellido', JSON.stringify(apellido));
  }
  static saveCorreo(correo) {
    localStorage.setItem('correo', JSON.stringify(correo));
  }

  static saveTelefono(telefono) {
    localStorage.setItem('telefono', JSON.stringify(telefono));
  }

  static saveRol(id_rol) {
    localStorage.setItem('id_rol', JSON.stringify(id_rol));
  }

  static clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('correo');
    localStorage.removeItem('telefono');
    localStorage.removeItem('id_rol');
  }

  static getUserData() {
    return {
      token: localStorage.getItem('token'),
      id_usuario: JSON.parse(localStorage.getItem('id_usuario')),
      nombre: JSON.parse(localStorage.getItem('nombre')),
      apellido: JSON.parse(localStorage.getItem('apellido')),
      correo: JSON.parse(localStorage.getItem('correo')),
      telefono: JSON.parse(localStorage.getItem('telefono')),
      rol: JSON.parse(localStorage.getItem('id_rol')),
    };
  }
}


export default userStorage; 

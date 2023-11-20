import styles from '@styles/ContainerFormUser.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import usuarioService from '@services/api/usuarioService';


export default function RegistroUsuario() {
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    numeroCelular: '',
    codPais: 0,
    userPassword: '',
    id_rol: 0,
    accion: 'insert', 
  });

  const [confirmarCorreo, setConfirmarCorreo] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegistroUsuario = async (e) => {
    e.preventDefault();

    if (confirmarCorreo !== formData.correo) {
      alert('Los correos electrónicos no coinciden');
      return;
    }else if (confirmarContrasena !== formData.password) {
      alert('Los passwords no coinciden');
      return;
    }

    try {
      await usuarioService.registrarUsuario(formData);
    } catch (error) {
      alert('Error al enviar los datos', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'confirmEmail' && value !== formData.correo) {
      alert('Los correos electrónicos no coinciden');
    }else if (name === 'confirmPassword' && value !== formData.password) {
      alert('Los passwords no coinciden');
    }
  };

  const [tiposRoles, setRoles] = useState([]);

  useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const roles = await usuarioService.obtenerRol();
        setRoles(roles.data);
      } catch (error) {
        console.error('Error al obtener los roles: ', error);
      }
    };

    obtenerRoles();
  }, []);

  const handleCancelar = () => {
    window.location.reload(); 
  }

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Usuario</h2>
        <form className={styles.formularioUsuario} onSubmit={handleRegistroUsuario}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" name="nombre" placeholder="Ingrese su nombre" className={styles.input} value={formData.nombre} onChange={handleInputChange} required/>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Apellido </label>
              <input type="text" name="apellido" placeholder="Ingrese su apellido" className={styles.input} value={formData.apellido} onChange={handleInputChange} required/>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Email </label>
              <input type="email" name="correo" placeholder="Ingrese su correo" className={styles.input} value={formData.correo} onChange={handleInputChange} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Confirmar Email </label>
              <input type="email" name="confirmEmail" placeholder="Ingrese su email" className={styles.input} value={confirmarCorreo} onChange={(e) => setConfirmarCorreo(e.target.value)} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Telefono </label>
              <div className={styles.containerPhone}>
                <select select name="codPais" id="CodPais" className={styles.select} value={formData.codPais} onChange={handleInputChange}>
                  <option value="57" name="codPais" className={styles.option}>
                    57
                  </option>
                </select>
                <input type="number" name="numeroCelular" placeholder="Ingrese su telefono" className={styles.input} value={formData.numeroCelular} onChange={handleInputChange} required />
              </div>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Password </label>
              <input type="password" name="password" placeholder="Ingrese su password" className={styles.input} value={formData.password} onChange={handleInputChange} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Confirmar Password </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Ingrese su password"
                className={styles.input}
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Tipo de rol </label>
              <select select name="tipoRol" id="tipoRol" className={styles.select} value={formData.tipoRol} onChange={handleInputChange}>
                {Array.isArray(tiposRoles) &&
                  tiposRoles.map((tipo) => (
                    <option key={tipo.id} value={tipo.id} className={styles.option}>
                      {tipo.nombreRol}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.inputbox}>
              <div className={styles.containerButton}>
                <input type="submit" value="Registrar" className={styles.input} />
                <input type="button" value="Cancelar" className={styles.input} onClick={handleCancelar}/>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
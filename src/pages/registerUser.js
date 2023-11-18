import styles from '@styles/ContainerFormUser.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import usuarioService from '@services/api/usuarioService';
export default function RegistroUsuario() {
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    codPais: 0,
    password: '',
    tipoRol: 0,
  });

  const handleRegistroUsuario = async (e) => {
    e.preventDefault();
    try {
      await usuarioService.registrarUsuario(formData);
    } catch (error) {
      console.error('error al enviar los datos', error);
    }
  };

  const handleInputChangue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [tiposRoles, setRoles] = useState([]);

  useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const roles = await usuarioService.obtenerRol();
        setRoles(roles);
      } catch (error) {
        console.error('Error al obtener los roles: ', error);
      }
    };
    obtenerRoles();
  }, []);

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Usuario</h2>
        <form className={styles.formularioUsuario} onSubmit={handleRegistroUsuario}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" placeholder="Ingrese su nombre" className={styles.input} value={formData.nombre} onChange={handleInputChangue} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Apellido </label>
              <input type="text" placeholder="Ingrese su apellido" className={styles.input} value={formData.apellido} onChange={handleInputChangue} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Email </label>
              <input type="email" placeholder="Ingrese su correo" className={styles.input} value={formData.correo} onChange={handleInputChangue} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Confirmar Email </label>
              <input type="email" placeholder="Ingrese su email" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Telefono </label>
              <div className={styles.containerPhone}>
                <select name="codPais" id="CodPais" className={styles.select} value={formData.codPais} onChange={handleInputChangue}>
                  <option value="57" className={styles.option}>
                    57
                  </option>
                </select>
                <input type="number" placeholder="Ingrese su telefono" className={styles.input} value={formData.telefono} onChange={handleInputChangue} />
              </div>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Password </label>
              <input type="password" placeholder="Ingrese su password" className={styles.input} value={formData.password} onChange={handleInputChangue} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Confirmar Password </label>
              <input type="password" placeholder="Ingrese su password" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Tipo de rol </label>
              <select name="tipoRol" id="tipoRol" className={styles.select} value={formData.tipoRol} onChange={handleInputChangue}>
                {tiposRoles.map((tipo) => (
                  <option key={tipo.id} value={tipo.id} className={styles.option}>
                    {tipo.nombreRol}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputbox}>
              <div className={styles.containerButton}>
                <input type="submit" value="Registrar" className={styles.input} />
                <input type="reset" value="Cancelar" className={styles.input} />
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

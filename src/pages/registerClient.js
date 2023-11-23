import styles from '@styles/ContainerFormUser.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import clientService from '@services/api/clientService';
import userStorage from '@services/api/userStorage';

export default function RegistroCliente() {
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    codPais: 57,
    numeroCelular: '',
    direccion: '',
    id_ruta: 0,
    id_usuario: 0,
    accion: 'insert',
  });

  useEffect(() => {
    const userDataString = userStorage.getUserData();

    if (userDataString && userDataString.id_usuario) {
      const idVendedor = parseInt(userDataString.id_usuario, 10);
      if (!isNaN(idVendedor)) {
        setFormData((prevData) => ({
          ...prevData,
          id_usuario: idVendedor,
        }));
        console.log('idVendedor: ', idVendedor);
      } else {
        console.error('El id del usuario no es valido. ');
      }
    } else {
      console.error('No se encontro el id del usuario');
    }
  }, []);

  const handleRegistrarCliente = async (e) => {
    e.preventDefault();
    try {
      const response = await clientService.registrarCliente(formData);
      console.log(formData)
      if (response.success) {
        alert('Cliente registrado exitosamente');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        alert('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('error al enviar los datos ', error);
    }
  };

  const handleInputChangue = (e) => {
    const { name, value } = e.target;

    if (name === 'id_ruta') {
      setFormData((prevData) => ({
        ...prevData,
        id_ruta: parseInt(value, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const obtenerRutas = async () => {
      try {
        const ruta = await clientService.obtenerRutas();
        if (ruta.success) {
          setRutas(ruta.data.body);
        } else {
          console.error('error al obtener la informacion de las rutas');
        }
      } catch (error) {
        console.error('error al obtener las rutas', error);
      }
    };
    obtenerRutas();
  }, []);

  const handleCancelar = () => {
    window.location.reload();
  };

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Cliente</h2>
        <form className={styles.formularioUsuario} onSubmit={handleRegistrarCliente}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" name="nombres" placeholder="Ingrese su nombre" className={styles.input} value={formData.nombres} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Email </label>
              <input type="email" name="correo" placeholder="Ingrese su correo" className={styles.input} value={formData.correo} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Apellido </label>
              <input type="text" name="apellidos" placeholder="Ingrese su apellido" className={styles.input} value={formData.apellidos} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Telefono </label>
              <div className={styles.containerPhone}>
                <select name="codPais" className={styles.select} onChange={handleInputChangue}>
                  <option value="+57" className={styles.option}>
                    57
                  </option>
                </select>
                <input type="number" name="numeroCelular" placeholder="Ingrese su telefono" className={styles.input} value={formData.numeroCelular} onChange={handleInputChangue} required />
              </div>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Direccion </label>
              <input type="text" name="direccion" placeholder="Ingrese su direccion" className={styles.input} value={formData.direccion} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Ruta </label>
              <select name="id_ruta" className={styles.select} value={formData.id_ruta} onChange={handleInputChangue} required>
                {Array.isArray(rutas) &&
                  rutas.map((rut) => (
                    <option key={rut.id_ruta} value={rut.id_ruta} className={styles.option}>
                      {rut.nombre_ruta}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.inputbox}>
              <div className={styles.containerButton}>
                <input type="submit" value="Registrar" className={styles.input} />
                <input type="button" value="Cancelar" className={styles.input} onClick={handleCancelar} />
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

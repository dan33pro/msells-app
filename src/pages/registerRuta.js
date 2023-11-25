import styles from '@styles/ContainerFormProduct.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import userStorage from '@services/api/userStorage';
import routeService from '@services/api/routeService';
import userService from '@services/api/usuarioService';

export default function RegistroRuta() {
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState({
    nombre_ruta: '',
    id_usuario: 0,
    id_vendedor: 0,
    id_entregador: 0,
    accion: 'insert', //se agrega el campo "accion" con el valor "insert"
  });

  useEffect(() => {
    const userDataString = userStorage.getUserData();

    if (userDataString && userDataString.id_usuario) {
      const idAdmin = parseInt(userDataString.id_usuario, 10);
      if (!isNaN(idAdmin)) {
        setFormData((prevData) => ({
          ...prevData,
          id_usuario: idAdmin,
        }));
        console.log('idAdmin: ', idAdmin);
      } else {
        console.error('El id del usuario no es valido. ');
      }
    } else {
      console.error('No se encontro el id del usuario');
    }
  }, []);

  const handleRegistroRuta = async (e) => {
    e.preventDefault();
    try {
      const response = await routeService.registrarRuta(formData);
      console.log(formData);
      if (response.success) {
        alert('Ruta registrada exitosamente');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        alert('Error al registrar la ruta');
      }
    } catch (error) {
      console.error('error al enviar los datos', error);
    }
  };
  const handleInputChangue = (e) => {
    const { name, value } = e.target;

    if (name === 'id_vendedor' || name === 'id_entregador') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const [vendedores, setVendedor] = useState([]);
  const [delivery, setDelivery] = useState([]);
  useEffect(() => {
    const obtenerVendedores = async () => {
      try {
        const info = await userService.obtenerVendedores();
        if (info.success) {
          setVendedor(info.data.body);
        } else {
          console.error('error al obtener la informacion del vendedor');
        }
      } catch (error) {
        console.error('Error al obtener la informacion del vendedor: ', error);
      }
    };
    obtenerVendedores();
  }, []);

  useEffect(() => {
    const obtenerDelivery = async () => {
      try {
        const info = await userService.obtenerDelivery();
        if (info.success) {
          setDelivery(info.data.body);
        } else {
          console.error('error al obtener la informacion del delivery');
        }
      } catch (error) {
        console.error('Error al obtener la informacion del delivery: ', error);
      }
    };
    obtenerDelivery();
  }, []);

  const handleCancelar = () => {
    window.location.reload();
  };

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Ruta</h2>
        <form className={styles.formularioUsuario} onSubmit={handleRegistroRuta}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre Ruta: </label>
              <input type="text" name="nombre_ruta" placeholder="ingrese el nombre de la ruta" className={styles.input} value={formData.nombre_ruta} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Seleccione el vendedor: </label>
              <select name="id_vendedor" className={styles.select} value={formData.id_vendedor} onChange={handleInputChangue} required>
                {Array.isArray(vendedores) &&
                  vendedores.map((vendor) => (
                    <option key={vendor.id_usuario} value={vendor.id_usuario} className={styles.option}>
                      {vendor.nombres + ' ' + vendor.apellidos}
                    </option>
                  ))}
              </select>
            </div>
             <div className={styles.inputbox}>
              <label className={styles.details}>Seleccione el Delivery: </label>
              <select name="id_entregador" className={styles.select} value={formData.id_entregador} onChange={handleInputChangue} required>
                {Array.isArray(delivery) &&
                  delivery.map((deliv) => (
                    <option key={deliv.id_usuario} value={deliv.id_usuario} className={styles.option}>
                      {deliv.nombres + ' ' + deliv.apellidos}
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

import styles from '@styles/ContainerFormProduct.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import productService from '@services/api/productService';
import userStorage from '@services/api/userStorage';

export default function RegistroProducto() {
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState({
    nombreProducto: '',
    descripcion: '',
    precio: 0,
    empresa: '', 
    tipoProducto: 0,
    idAdmin: 0,
    imagen: '',
  });

  useEffect(() => {
    const userDataString = userStorage.getUserData();

    if (userDataString && userDataString.id_usuario) {
      const idAdmin = parseInt(userDataString.id_usuario, 10);
      if (!isNaN(id_usuario)) {
        setFormData((prevData) => ({
          ...prevData,
          idAdmin: idAdmin,
        }));
        console.log('idAdmin: ', idAdmin);
      } else {
        console.error('El id del usuario no es valido. ');
      }
    } else {
      console.error('No se encontro el id del usuario');
    }
  }, []);

  const handleRegistroProducto = async (e) => {
    e.preventDefault();
    try {
      await productService.registrarProducto(formData);
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
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Img = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          imagen: base64Img,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Por favor, seleccione una imagen valida');
    }
  };

  const [tiposProducto, setTiposProducto] = useState([]);

  useEffect(() => {
    const obtenerTipoProducto = async () => {
      try {
        const tipos = await productService.obtenerTipoProducto();
        setTiposProducto(tipos.data);
      } catch (error) {
        console.error('Error al obtener tipos de productos: ', error);
      }
    };

    obtenerTipoProducto();
  }, []);


  const handleCancelar = () => {

    window.location.reload(); 
  }

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Producto</h2>
        <form className={styles.formularioUsuario} onSubmit={handleRegistroProducto}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Subir Imagen </label>
              <input type="file" name="imagen" id="imagen" className={styles.input} onChange={handleImagenChange} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Precio </label>
              <input type="number" name="precioUnitario" id="precioUnitario" placeholder="ingrese el precio" className={styles.input} value={formData.precio} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input
                type="text"
                name="nombreProducto"
                id="nombreProducto"
                placeholder="ingrese el precio"
                className={styles.input}
                value={formData.nombreProducto}
                onChange={handleInputChangue}
                required
              />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Empresa: </label>
              <input
                type="text"
                name="empresa"
                id="empresa"
                placeholder="ingrese el nombre de la empresa"
                className={styles.input}
                value={formData.nombreProducto}
                onChange={handleInputChangue}
                required
              />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Tipo de producto </label>
              <select name="tipoProducto" id="tipoProducto" className={styles.select} value={formData.tipoProducto} onChange={handleInputChangue} required>
                {Array.isArray(tiposProducto) &&
                  tiposProducto.map((tipo) => (
                    <option key={tipo.id} value={tipo.id} className={styles.option}>
                      {tipo.nombreTipoProducto}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.inputboxDescripcion}>
              <label className={styles.details}> Descripcion </label>
              <textarea name="descripcion" id="descripcion" cols="105" rows="20" className={styles.textarea} value={formData.descripcion} onChange={handleInputChangue} required></textarea>
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

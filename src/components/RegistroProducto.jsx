import styles from '@styles/ContainerFormProduct.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import productService from '@services/api/productService';
import userStorage from '@services/api/userStorage';

const RegistroProducto = () => {
  const { state, toggleRegisterProduct } = useContext(AppContext);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    empresa: '',
    id_tipo_producto: 0,
    id_usuario: 0,
    imagen: '',
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

  const handleRegistroProducto = async (e) => {
    e.preventDefault();
    try {
      const response = await productService.registrarProducto(formData);
      console.log(formData)
      if (response.success) {
        alert('Producto registrado exitosamente');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('error al enviar los datos', error);
    }
  };
  const handleInputChangue = (e) => {
    const { name, value } = e.target;

    if (name === 'id_tipo_producto') {
      setFormData((prevData) => ({
        ...prevData,
        id_tipo_producto: parseInt(value, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
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
        if(tipos.success){
        setTiposProducto(tipos.data.body);
        }else{
          console.error('error al obtener la informacion del tipo de producto'); 
        }
      } catch (error) {
        console.error('Error al obtener tipos de productos: ', error);
      }
    };
    obtenerTipoProducto();
  }, []);

  const handleCancelar = () => {
    toggleRegisterProduct(false);
  };

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Producto</h2>
        <form className={styles.formularioUsuario} onSubmit={handleRegistroProducto}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Subir Imagen </label>
              <input type="file" name="imagen" className={styles.input} onChange={handleImagenChange} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Precio </label>
              <input type="number" name="precio" placeholder="ingrese el precio" className={styles.input} value={formData.precio} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" name="nombre" placeholder="ingrese el nombre del producto" className={styles.input} value={formData.nombre} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Empresa: </label>
              <input type="text" name="empresa"  placeholder="ingrese el nombre de la empresa" className={styles.input} value={formData.empresa} onChange={handleInputChangue} required />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Tipo de producto </label>
              <select name="id_tipo_producto" className={styles.select} value={formData.id_tipo_producto} onChange={handleInputChangue} required>
                {Array.isArray(tiposProducto) &&
                  tiposProducto.map((tipo) => (
                    <option key={tipo.id_tipo_producto} value={tipo.id_tipo_producto} className={styles.option}>
                      {tipo.detalle}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.inputboxDescripcion}>
              <label className={styles.details}> Descripcion </label>
              <textarea name="descripcion" cols="105" rows="20" className={styles.textarea} value={formData.descripcion} onChange={handleInputChangue} required></textarea>
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

export default RegistroProducto;
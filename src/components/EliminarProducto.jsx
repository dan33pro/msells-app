import Image from 'next/image';
import styles from '@styles/ContainerDeleteClient.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import imageUser from '@icons/imagen.svg';
import userStorage from '@services/api/userStorage';
import productService from '@services/api/productService';

const EliminarProducto = () => {
  const { state, toggleDeleteProduct } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: 0,
  });
  useEffect(() => {
    const userDataString = userStorage.getUserData();
    if (userDataString && userDataString.id_usuario) {
      const idUser = parseInt(userDataString.id_usuario, 10);
      if (!isNaN(idUser)) {
        setFormData((prevData) => ({
          ...prevData,
          id_usuario: idUser,
        }));
        console.log('el id del usuario es: ', idUser);
      } else {
        console.error('el id del usuario no es valido. ');
      }
    } else {
      console.error('No se encontro el id del usuario');
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.obtenerProductos();
        setProducts(response.data.body);
      } catch (error) {
        console.error('Error al obtener la informacion del productos', error);
      }
    };
    fetchProducts();
  }, []);

  const handleEliminarProducto = async (idProducto, event) => {
    event.preventDefault();

    try {
      console.log(idProducto, formData.id_usuario);
      const response = await productService.deleteProduct(idProducto, formData.id_usuario);

      if (response.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id_producto !== idProducto));
        alert('Producto eliminado exitosamente');
      } else {
        alert('No se puede eliminar este producto porque el id esta siendo utilizado en un pedido');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de eliminación', error);
    }
  };

  const handleCancelar = () => {
    toggleDeleteProduct(false);
  };

  return (
    <section className={styles.containerPrinciple}>
      <form className={styles.form}>
        <h2 className={styles.title}>Eliminar Producto</h2>
        <article className={styles.contenedor}>
          {Array.isArray(products) &&
            products.length > 0 &&
            products.map((product) => (
              <div key={product.id_producto} className={styles.diseño1}>
                <Image src={imageUser} alt="Imagen de Usuario" />
                <span className={styles.span}>{`${product.nombre}`}</span>
                <button className={styles.eliminarButton} onClick={(event) => handleEliminarProducto(product.id_producto, event)}>
                  Eliminar
                </button>
              </div>
            ))}

          <div className={styles.inputbox}>
            <div className={styles.containerButton}>
              <input type="button" value="Cancelar" className={styles.input} onClick={handleCancelar} />
            </div>
          </div>
        </article>
      </form>
    </section>
  );
}

export default EliminarProducto; 
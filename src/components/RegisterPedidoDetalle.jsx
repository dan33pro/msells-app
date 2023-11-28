import Image from 'next/image';
import styles from '@styles/ContainerFormPedido.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import imagePedido from '@icons/pedido.svg';
import userStorage from '@services/api/userStorage';
import productService from '@services/api/productService';
import orderDetailService from '@services/api/orderDetailService';


export default function RegistroDetallePedido() {
  const { state, toggleRegisterDetailPedido } = useContext(AppContext);

  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [cantidadInput, setCantidadInput] = useState({});
  const [totalInput, setTotalInput] = useState({});
  const [formData, setFormData] = useState({
    id_producto: 0,
    id_pedido: 0,
    cantidad: 0,
    total: '',
    id_usuario: 0,
    accion: 'insert-compose',
  });

  useEffect(() => {
    if (state?.elements?.pedido) {
      setFormData((prevData) => ({
        ...prevData,
        id_pedido: state.elements.pedido,
      }));
    }
  }, [state.elements.pedido]);

  useEffect(() => {
    if (productosEncontrados === undefined || productosEncontrados === null) {
      setProductosEncontrados([]);
    }

    const userDataString = userStorage.getUserData();
    if (userDataString && userDataString.id_usuario) {
      const idVendedor = parseInt(userDataString.id_usuario, 10);
      if (!isNaN(idVendedor)) {
        setFormData((prevData) => ({
          ...prevData,
          id_usuario: idVendedor,
        }));
        console.log('idVendedor', idVendedor);
      } else {
        console.error('el id del usuario no es valido. ');
      }
    } else {
      console.error('no se encontro el id del usuario');
    }
  }, [productosEncontrados]);

  const handleBuscarProducto = async (e) => {
    e.preventDefault();
    try {
      const response = await productService.obtenerProductoNombre(inputValue || '');
      console.log('API Response:', response.data.body);

      if (response.success) {
        setProductosEncontrados((prevProductos) => [
          ...prevProductos.map((producto) => ({
            ...producto,
            cantidad: cantidadInput[producto.id_producto] || 0,
            total: (cantidadInput[producto.id_producto] || 0) * parseInt(producto.precio),
          })),
          ...response.data.body,
        ]);
      } else {
        console.error('Error al buscar el producto:', response.message);
      }
    } catch (error) {
      console.error('Error al buscar el producto:', error);
    }
  };

  const handleRegistrarDetallePedido = async (e) => {
    e.preventDefault();

    try {
      let isOk = false;
      for (let i = 0; i < productosEncontrados.length; i++) {
        let producto = productosEncontrados[i];
        const detallePedido = {
          id_producto: producto.id_producto,
          id_pedido: formData.id_pedido,
          cantidad: parseInt(cantidadInput[producto.id_producto], 10) || 0,
          total: String(totalInput[producto.id_producto] || 0),
          id_usuario: formData.id_usuario,
          accion: formData.accion,
        };

        try {
          const response = await orderDetailService.registrarDetallePedido(detallePedido);

          if (response.success) {
            if (i == (productosEncontrados.length - 1)) {
              isOk = true;
            }
            console.log(`Producto con id: ${detallePedido.id_producto} asociado exitosamente`);
          } else {
            console.log(`Error al asociar el producto con id: ${detallePedido.id_producto}`);
          }
        } catch (error) {
          console.error(`Error al enviar el detalle del pedido ${detallePedido.id_producto}`, error);
        }
      }

      if (isOk) {
        toggleRegisterDetailPedido(false);
      }
    } catch (error) {
      console.error('Error al enviar los datos', error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleCantidadInputChange = (e, id) => {
    const { value } = e.target;
    setCantidadInput((prevCantidad) => ({
      ...prevCantidad,
      [id]: value !== '' ? value : 0,
    }));
    setTotalInput((prevTotal) => ({
      ...prevTotal,
      [id]: value * parseInt(productosEncontrados.find((producto) => producto.id_producto === id)?.precio || 0),
    }));
  };

  const handleCancelar = () => {
    toggleRegisterDetailPedido(false);
  };

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.rightform}>
        <Image src={imagePedido} alt="Imagen de pedido" />
      </section>
      <section className={styles.leftForm}>
        <form className={styles.form} onSubmit={handleBuscarProducto}>
          <h2 className={styles.title}>Registrar Detalle Pedido</h2>
          <label className={styles.label}>Producto</label>
          <div className={styles.containerText}>
            <input type="text" name="nombreProducto" className={styles.input} placeholder="Ingrese el nombre del producto" value={inputValue} onChange={handleInputChange} required />
            <section className={styles.containerButton}>
              <input type="submit" value="Buscar Producto" className={styles.input} />
            </section>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nombre</th>
                <th className={styles.th}>Precio</th>
                <th className={styles.th}>Cantidad</th>
                <th className={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productosEncontrados) &&
                productosEncontrados.length > 0 &&
                productosEncontrados.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td className={styles.td}>{producto.nombre}</td>
                    <td className={styles.td}>{parseInt(producto.precio)}</td>
                    <td className={styles.td}>
                      <input type="number" value={cantidadInput[producto.id_producto] || 0} onChange={(e) => handleCantidadInputChange(e, producto.id_producto)} />
                    </td>
                    <td className={styles.td}>{totalInput[producto.id_producto] || 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={styles.inputbox}>
            <div className={styles.containerButton}>
              <input type="submit" value="Registrar" className={styles.input} onClick={handleRegistrarDetallePedido} />
              <input type="submit" value="Cancelar" className={styles.input} onClick={handleCancelar} />
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

import Image from 'next/image';
import styles from '@styles/ContainerFormPedido.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import imagePedido from '@icons/pedido.svg';
import userStorage from '@services/api/userStorage';
import productService from '@services/api/productService';
import orderDetailService from '@services/api/orderDetailService';



// ... (importaciones)

export default function RegistroDetallePedido() {
  const { state } = useContext(AppContext);

  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [cantidadInput, setCantidadInput] = useState({});
  const [totalInput, setTotalInput] = useState({});

  const handleBuscarProducto = async (e) => {
    e.preventDefault();
    try {
      const response = await productService.obtenerProductoNombre(inputValue || '');
      console.log('API Response:', response.data.body);

      if (response.success) {
        setProductosEncontrados((prevProductos) => 
          prevProductos.map((producto) => ({
            ...producto,
            cantidad: cantidadInput[producto.id_producto] || 0,
            total: (cantidadInput[producto.id_producto] || 0) * parseInt(producto.precio),
          }))
        );
        setProductosEncontrados((prevProductos) => [...prevProductos, ...response.data.body]);
      } else {
        console.error('Error al buscar el producto:', response.message);
      }
    } catch (error) {
      console.error('Error al buscar el producto:', error);
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
      [id]: value,
    }));
    setTotalInput((prevTotal) => ({
      ...prevTotal,
      [id]: value * parseInt(productosEncontrados.find((producto) => producto.id_producto === id)?.precio || 0),
    }));
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
          <input
            type="text"
            name="nombreProducto"
            className={styles.input}
            placeholder="Ingrese el nombre del producto"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <section className={styles.containerButton}>
            <input type="submit" value="Buscar Producto" className={styles.input} />
          </section>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(productosEncontrados) &&
                productosEncontrados.length > 0 &&
                productosEncontrados.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td>{producto.nombre}</td>
                    <td>{parseInt(producto.precio)}</td>
                    <td>
                      <input
                        type="number"
                        value={cantidadInput[producto.id_producto] || 0}
                        onChange={(e) => handleCantidadInputChange(e, producto.id_producto)}
                      />
                    </td>
                    <td>{totalInput[producto.id_producto] || 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
      </section>
    </section>
  );
}

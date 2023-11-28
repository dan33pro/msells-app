import { useState } from 'react';
import productService from '@services/api/productService';
import { View, Filtro, Card, Button, CardProduct } from '@hooks/useEntidades';

const viewConsultarProductos = new View({ title: 'Consultar Productos', stateView: false, entidad: 'producto', search: true, cardElement: 'ProductCard' });
const productsState = {
  viewConsultarProductos: viewConsultarProductos,
};

const useProduct = () => {
  const [state, setState] = useState(productsState);

  const changeState = (newState) => {
    setState({
      ...newState,
    });
  };

  const updateViewConsultarProductos = (productos) => {
    state.viewConsultarProductos.removeContent();
    productos.forEach((producto) => {
      let imgBase64IS = Buffer.from(producto.imagen.data).toString();

      let productCard = new CardProduct({
        nameProduct: producto.nombre,
        description: `Descripción: ${producto.descripcion} - Precio: $${producto.precio}`,
        caracteristics: [`ID: ${producto.id_producto}`, `TIPO: ${producto.id_tipo_producto}`, `Empresa: ${producto.empresa}`],
        img: imgBase64IS,
      });

      state.viewConsultarProductos.addContent(productCard);
    });

    changeState(state);
  };

  const consultarProductos = async () => {
    let response = await productService.obtenerProductos();

    if (response.success) {
      updateViewConsultarProductos(response.data.body);
    }
  };

  const obtenerCardsProductsDetail = async (detallesPedido) => {
    let result = [];
    for (let i = 0; i < detallesPedido.length; i++) {
      let detallePedido = detallesPedido[i];
      let myProduct = await consultarProducto(detallePedido.id_producto);

      if (myProduct) {
        let imgBase64IS = Buffer.from(myProduct.imagen.data).toString();

        let productCard = new CardProduct({
          nameProduct: myProduct.nombre,
          description: `Cantidad: ${detallePedido.cantidad} - Precio Unitario: $${detallePedido.total / detallePedido.cantidad} - Precio Total: $${detallePedido.total}`,
          caracteristics: [`ID: ${myProduct.id_producto}`, `TIPO: ${myProduct.id_tipo_producto}`, `Empresa: ${myProduct.empresa}`],
          img: imgBase64IS,
        });

        result[i] = productCard;
      }
    }
    return result;
  };

  const consultarProducto = async (idProducto) => {
    let product = await productService.obtenerProducto(idProducto);

    if (product.success) {
      let myProduct = product.data.body[0];
      return myProduct;
    }

    return null;
  };

  return {
    state,
    obtenerCardsProductsDetail,
    consultarProducto,
    consultarProductos,
  };
};

export default useProduct;

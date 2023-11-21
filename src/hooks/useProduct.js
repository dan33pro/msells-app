import {CardProduct} from '@hooks/useEntidades';
import productService from '@services/api/productService';


const useProduct = () => {

  const obtenerCardProductDetail = async (detallePedido) => {
    let myProduct = await consultarProducto(detallePedido.id_producto);
    if(myProduct) {
      let imgBase64IS = myProduct.imagen.toString();

      let productCard = new CardProduct({
        nameProduct: myProduct.nombre,
        description: `Cantidad: ${detallePedido.cantidad} - Precio Unitario: $${(detallePedido.total / detallePedido.cantidad)} - Precio Total: $${detallePedido.total}`,
        caracteristics: [`ID: ${myProduct.id_producto}`, `TIPO: ${myProduct.id_tipo_producto}`, `Empresa: ${myProduct.empresa}`],
        img: imgBase64IS,
      });

      return productCard;
    }

    return null;
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
    obtenerCardProductDetail,
    consultarProducto,
  };
};

export default useProduct;

import {CardProduct} from '@hooks/useEntidades';
import productService from '@services/api/productService';


const useProduct = () => {

  const obtenerCardsProductsDetail = async (detallesPedido) => {
    let result = [];
    for(let i = 0; i < detallesPedido.length; i++) {
      let detallePedido = detallesPedido[i];
      let myProduct = await consultarProducto(detallePedido.id_producto);

      if(myProduct) {
        let imgBase64IS = Buffer.from(myProduct.imagen.data).toString();

        let productCard = new CardProduct({
          nameProduct: myProduct.nombre,
          description: `Cantidad: ${detallePedido.cantidad} - Precio Unitario: $${(detallePedido.total / detallePedido.cantidad)} - Precio Total: $${detallePedido.total}`,
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
    obtenerCardsProductsDetail,
    consultarProducto,
  };
};

export default useProduct;

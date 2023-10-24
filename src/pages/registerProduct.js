import styles from '@styles/ContainerFormProduct.module.scss';
import { useContext } from 'react';
import AppContext from '@context/AppContext';

export default function RegistroProducto() {
  const { state } = useContext(AppContext);
  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Producto</h2>
        <form className={styles.formularioUsuario}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Subir Imagen </label>
              <input type="file" name="imagen" id="imagen" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Precio </label>
              <input type="number" name="precioUnitario" id="precioUnitario" placeholder="ingrese el precio" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" name="nombreProducto" id="nombreProducto" placeholder="ingrese el precio" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Tipo de producto </label>
              <select name="tipoProducto" id="tipoProducto" className={styles.select}>
                <option value="" className={styles.option}></option>
                <option value="" className={styles.option}></option>
                <option value="" className={styles.option}></option>
              </select>
            </div>
            <div className={styles.inputboxDescripcion}>
                <label className={styles.details}> Descripcion </label>
                    <textarea name='descripcion' id='descripcion'
                      cols="105" rows="20" className={styles.textarea}>
                    </textarea>
            </div>
            <div className={styles.inputbox}>
              <div className={styles.containerButton}>
                <input type="submit" value="Registrar" className={styles.input} />
                <input type="submit" value="Cancelar" className={styles.input} />
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

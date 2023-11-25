import Image from 'next/image';
import styles from '@styles/ContainerFormPedido.module.scss';
import { useContext } from 'react';
import AppContext from '@context/AppContext';
import imagePedido from '@icons/pedido.svg'; 


export default function RegistroPedido() {
  const { state } = useContext(AppContext);

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.rightform}>
        <Image src={imagePedido} alt="Imagen de pedido" />
      </section>
      <section className={styles.leftForm}>
        <form className={styles.form} method="POST">
          <h2 className={styles.title}>Crear Pedido</h2>
          <label className={styles.label}>Fecha Pedido</label>
          <input type="date"  name="fechaPedido" className={styles.input} placeholder="seleccione la fecha del pedido" required/>
          <div className={styles.inputboxDescripcion}>
          <label className={styles.details}> Notas </label>
          <textarea name="notas" id="notas" cols="105" rows="20" className={styles.textarea} required></textarea>
          </div>
          <section className={styles.containerButton}>
            <input type="submit" value="Registrar" className={styles.input} />
            <input type="submit" value="Cancelar" className={styles.input} />
          </section>
        </form>
      </section>
    </section>
  );
}

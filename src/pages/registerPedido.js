import styles from '@styles/ContainerFormPedido.module.scss';
import { useContext } from 'react';
import AppContext from '@context/AppContext';

export default function RegistroPedido() {
  const { state } = useContext(AppContext);

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.leftForm}>
        <form className={styles.form} method="POST">
          <h2 className={styles.title}>Crear Pedido</h2>
        </form>
      </section>
    </section>
  );
}

import styles from '@styles/MenuOptions.module.scss';
import logoConsulta from '@icons/lupa.svg';
import logoRuta from '@icons/ubicacion.svg';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import closeIcon from '@icons/close_icon.svg';

const OpcionesConsultaDelivery = () => {
  const { state, toggleOCD, closePrincipalViews, toggleviewConsultarProductos, toggleConsultarRutas } = useContext(AppContext);

  const closeView = () => {
   toggleOCD(false);
  };

  const openCP = () => {
    toggleOCD(false);
    closePrincipalViews();
    toggleviewConsultarProductos(true);
   };

   const openCR = () => {
    toggleOCD(false);
    closePrincipalViews();
    toggleConsultarRutas(true);
   };
  return (
    <section className={styles.containerPrinciple}>
      <nav className={styles['title-container']}>
        <h1 className={styles.titulo}>Opciones Consulta</h1>
        <button onClick={closeView} onKeyDown={closeView}>
          <Image src={closeIcon} alt="close icon" width={30} height={30} />
        </button>
      </nav>
      <article className={styles.contenedor}>
        <button onClick={openCP} onKeyDown={openCP} className={styles['menu-option']}>
          <span className={styles.negrilla}>Consultar Productos</span>
          <Image src={logoConsulta} alt="imagen logo consulta" />
        </button>
        <button onClick={openCR} onKeyDown={openCR} className={styles['menu-option']}>
          <span className={styles.negrilla}>Consultar Rutas</span>
          <Image src={logoRuta} alt="imagen logo consulta" />
        </button>
      </article>
    </section>
  );
}

export default OpcionesConsultaDelivery;
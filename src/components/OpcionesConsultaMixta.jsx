import styles from '@styles/MenuOptions.module.scss';
import logoConsulta from '@icons/lupa.svg';
import logoRuta from '@icons/ubicacion.svg';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import closeIcon from '@icons/close_icon.svg';

const OpcionesConsultaMixta = () => {
  const { state, toggleOCM, toggleviewConsultarProductos, toggleConsultarRutas, closePrincipalViews } = useContext(AppContext);

  const closeView = () => {
    toggleOCM(false);
  };

  const openCP = () => {
    toggleOCM(false);
    closePrincipalViews();
    toggleviewConsultarProductos(true);
   };

   const openCR = () => {
    toggleOCM(false);
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
        <button className={styles['menu-option']} onClick={openCP} onKeyDown={openCP}>
          <span className={styles.negrilla}>Consultar Productos</span>
          <Image src={logoConsulta} alt="imagen logo consulta" />
        </button>
        <button className={styles['menu-option']} onClick={openCR} onKeyDown={openCR}>
          <span className={styles.negrilla}>Consultar Rutas</span>
          <Image src={logoRuta} alt="imagen logo consulta" />
        </button>
      </article>
    </section>
  );
}

export default OpcionesConsultaMixta;

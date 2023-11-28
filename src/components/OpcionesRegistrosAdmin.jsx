import styles from '@styles/MenuOptions.module.scss';
import logoRegistro from '@icons/registrar.svg';
import logoEliminar from '@icons/Eliminar.svg';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import closeIcon from '@icons/close_icon.svg';

const OpcionesRegistroAdmin = () => {
   const { state, toggleORA } = useContext(AppContext);

   const closeView = () => {
    toggleORA(false);
   };

  return (
    <section className={styles.containerPrinciple}>
      <nav className={styles['title-container']}>
        <h1 className={styles.titulo}>Opciones Registro</h1>
        <button onClick={closeView} onKeyDown={closeView}>
          <Image src={closeIcon} alt="close icon" width={30} height={30} />
        </button>
      </nav>
      <article className={styles.contenedor}>
        <div className={styles['menu-option']}>
          <span className={styles.negrilla}>Registrar Usuario</span>
          <Image src={logoRegistro} alt="imagen logo registro" />
        </div>
        <div className={styles['menu-option']}>
          <span className={styles.negrilla}>Registrar Producto</span>
          <Image src={logoRegistro} alt="imagen logo registro" />
        </div>
        <div className={styles['menu-option']}>
          <span className={styles.negrilla}>Registrar Ruta</span>
          <Image src={logoRegistro} alt="imagen logo registro" />
        </div>
        <div className={styles['menu-option']}>
          <span className={styles.negrilla}>Eliminar Producto</span>
          <Image src={logoEliminar} alt="imagen logo eliminar" />
        </div>
        <div className={styles['menu-option']}>
          <span className={styles.negrilla}>Eliminar Cliente</span>
          <Image src={logoEliminar} alt="imagen logo eliminar" />
        </div>
        <div className={styles['menu-option']}>
          <span className={styles.negrilla}>Eliminar Usuario</span>
          <Image src={logoEliminar} alt="imagen logo eliminar" />
        </div>
      </article>
    </section>
  );
};

export default OpcionesRegistroAdmin;

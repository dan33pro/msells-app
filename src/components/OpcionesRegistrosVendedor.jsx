import styles from '@styles/MenuOptions.module.scss';
import logoRegistro from '@icons/registrar.svg';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';
import closeIcon from '@icons/close_icon.svg';

const OpcionesRegistroVendedor = () => {
  const { state, toggleORV } = useContext(AppContext);

   const closeView = () => {
    toggleORV(false);
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
            <span className={styles.negrilla}>Registrar Cliente</span>
            <Image src={logoRegistro} alt='imagen logo registro'/>
         </div>     
    </article>
    </section>
  );
}

export default OpcionesRegistroVendedor;
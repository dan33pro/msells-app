import styles from '@styles/menuOptions.module.scss';
import logoRegistro from '@icons/registrar.svg';
import logoEliminar from '@icons/Eliminar.svg'; 
import AppContext from '@context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';

export default function opcionesRegistroAdmin() {
  const { state } = useContext(AppContext);

  return (
    <section className={styles.containerPrinciple}>
      <h1 className={styles.titulo}>Opciones Registro</h1>
       <article className={styles.contenedor}>
        <div className={styles.diseño1}>
            <span className={styles.negrilla}>Registrar Usuario</span>
            <Image src={logoRegistro} alt='imagen logo registro'/>
         </div>  
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Registrar Producto</span>
            <Image src={logoRegistro} alt='imagen logo registro'/>
         </div>   
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Registrar Ruta</span>
            <Image src={logoRegistro} alt='imagen logo registro'/>
         </div>  
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Eliminar Producto</span>
            <Image src={logoEliminar} alt='imagen logo eliminar'/>
         </div> 
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Eliminar Cliente</span>
            <Image src={logoEliminar} alt='imagen logo eliminar'/>
         </div> 
           <div className={styles.diseño1}>
            <span className={styles.negrilla}>Eliminar Usuario</span>
            <Image src={logoEliminar} alt='imagen logo eliminar'/>
         </div> 
    </article>
    </section>
  );
}

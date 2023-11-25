import styles from '@styles/menuOptions.module.scss';
import logoConsulta from '@icons/lupa.svg'; 
import logoRuta from '@icons/ubicacion.svg'; 
import AppContext from '@context/AppContext';
import Image from 'next/image';
import { useContext } from 'react';

export default function opcionesRegistroAdmin() {
  const { state } = useContext(AppContext);

  return (
    <section className={styles.containerPrinciple}>
      <h1 className={styles.titulo}>Opciones Consulta</h1>
       <article className={styles.contenedor}>
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Consultar Productos</span>
            <Image src={logoConsulta} alt='imagen logo consulta'/>
         </div>  
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Consultar Rutas</span>
            <Image src={logoRuta} alt='imagen logo consulta'/>
         </div>  
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Consultar Clientes</span>
            <Image src={logoConsulta} alt='imagen logo consulta'/>
         </div> 
         <div className={styles.diseño1}>
            <span className={styles.negrilla}>Consultar Pedidos</span>
            <Image src={logoConsulta} alt='imagen logo consulta'/>
         </div> 
    </article>
    </section>
  );
}

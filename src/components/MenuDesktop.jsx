import React from 'react';
import Link from 'next/link';
import styles from '@styles/MenuDesktop.module.scss';
import { useRouter } from 'next/router';
import userStorage from '@services/api/userStorage';

const MenuDesktop = () => {

  const router = useRouter(); 


  const cerrarSesion = () => {

    userStorage.clearUserData(); 
    router.push('/login'); 
    
  };


  return (
    <div className ={styles.MenuDesktop}>
        <ul>
            <li>
                <Link href="#" onClick={cerrarSesion}>Cerrar Sesión</Link>
            </li>
        </ul>
    </div>
  );
};

export default MenuDesktop;
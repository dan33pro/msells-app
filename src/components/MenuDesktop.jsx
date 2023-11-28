import React from 'react';
import Link from 'next/link';
import styles from '@styles/MenuDesktop.module.scss';
import userStorage from '@services/api/userStorage';
import AppContext from '@context/AppContext';
import { useContext } from 'react';

const MenuDesktop = () => {
  const { state, changeSesionState, toggleMenuDesktop } = useContext(AppContext);

  const cerrarSesion = () => {
    toggleMenuDesktop(false);
    userStorage.clearUserData();
    changeSesionState(false, '', 0);
  };

  return (
    <div className={styles.MenuDesktop}>
      <ul>
        <li>
          <Link href="" onClick={cerrarSesion}>
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuDesktop;

import React from 'react';
import Link from 'next/link';
import styles from '@styles/MenuDesktop.module.scss';

const MenuDesktop = () => {
  return (
    <div className ={styles.MenuDesktop}>
        <ul>
            <li>
                <Link href="#">Cerrar Sesión</Link>
            </li>
        </ul>
    </div>
  );
};

export default MenuDesktop;
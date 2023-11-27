import React, { useContext } from 'react';
import Image from 'next/image';

import MenuNav from '@components/MenuDesktop';
import AppContext from '@context/AppContext';

import logoMS from '@logos/logo_msells.svg';
import iconPerson from '@icons/person_icon.svg';
import iconMenu from '@icons/menu_icon.svg';

import styles from '@styles/Header.module.scss';

const Header = () => {
  const { state, toggleMenuDesktop, toggleMenuMobile } = useContext(AppContext);

  const handleToggleD = () => {
    toggleMenuMobile(false);
    toggleMenuDesktop(!state.isViewMenuDesktop);
  };

  const handleToggleM = () => {
    toggleMenuDesktop(false);
    toggleMenuMobile(!state.isViewMenuMobile);
  };

  return (
    <nav className={styles.Header}>
      <div className={styles.container}>
        <div className={styles['container-logo']}>
          <Image src={logoMS} alt="logo msells" />
          <span>MSells</span>
        </div>
        <ul className={styles.menu} onClick={handleToggleD} onKeyDown={handleToggleD}>
          <li className={styles['option-menu']}>
            <span>{state.user} - Rol: {state.idRol == 1 ? 'Administrador' : state.idRol == 2 ? 'Vendedor' : state.idRol == 3 ? 'Entregador' : ''}</span>
          </li>
          <li className={styles['option-menu']}>
            <Image src={iconPerson} alt="" />
          </li>
        </ul>
        <button className={styles['btn-menu']} onClick={handleToggleM} onKeyDown={handleToggleM}>
          <Image src={iconMenu} alt='Icono menu' />
        </button>
      </div>
      {state.isViewMenuDesktop && <MenuNav />}
    </nav>
  );
};

export default Header;

import React, { useState, useContext } from 'react';
import Image from 'next/image';

import AppContext from '@context/AppContext';

import iconList from '@icons/list_icon.svg';
import iconSearch from '@icons/register_icon.svg';
import iconSetings from '@icons/setings_icon.svg';

import styles from '@styles/NavOptions.module.scss';

const NavOptions = () => {
  const { state, toggleMenuDesktop, toggleOCM, toggleOCD, toggleORA, toggleORV } = useContext(AppContext);

  const handleToggleListOptions = () => {
    switch (state.idRol) {
      case 1:
        toggleOCM(!state.isViewOCMixta);
        toggleORA(false);
        break;
      case 2:
        toggleOCM(!state.isViewOCMixta);
        toggleORV(false);
        break;
      case 3:
        toggleOCD(!state.isViewOCDevivery);
        break;
    }
    toggleMenuDesktop(false);
  };

  const handleToggleRegisterOptions = () => {
    switch (state.idRol) {
      case 1:
        toggleOCM(false);
        toggleORA(!state.isViewORAdmin);
        break;
      case 2:
        toggleOCM(false);
        toggleORV(!state.isViewORVendedor);
        break;
      case 3:
        toggleOCD(false);
        break;
    }
    toggleMenuDesktop(false);
  };

  return (
    <aside className={`${styles.NavOptions} ${state.isViewMenuMobile ? styles['NavOptionsAnimantion'] : ''}`}>
      <ul className={styles.menu}>
        <li className={styles['option-menu']} onClick={handleToggleListOptions} onKeyDown={handleToggleListOptions}>
          <div className={styles['container-img']}>
            <Image src={iconList} alt="" />
          </div>
          <span className={styles['info-mobile']}>Opciones de consulta</span>
        </li>
        {state.idRol != 3 && (
          <li className={styles['option-menu']} onClick={handleToggleRegisterOptions} onKeyDown={handleToggleRegisterOptions}>
            <div className={styles['container-img']}>
              <Image src={iconSearch} alt="" />
            </div>
            <span className={styles['info-mobile']}>Opciones de registro</span>
          </li>
        )}
      </ul>
      <div className={styles['config-btn']}>
        <button className={styles['info-mobile']}>Cerrar Sesión</button>
        <div className={styles['container-img']}>
          <Image src={iconSetings} alt="boton de configuraciones" />
        </div>
      </div>
    </aside>
  );
};

export default NavOptions;

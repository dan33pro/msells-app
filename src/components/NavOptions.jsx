import React, { useState, useContext } from 'react';
import Image from 'next/image';

import AppContext from '@context/AppContext';

import iconList from '@icons/list_icon.svg';
import iconSearch from '@icons/register_icon.svg';
import iconSetings from '@icons/setings_icon.svg';

import styles from '@styles/NavOptions.module.scss';

const NavOptions = () => {
  const { state, toggleMenuDesktop } = useContext(AppContext);

  const [toggleListOptions, setToggleListOptions] = useState(false);
  const handleToggleListOptions = () => {
    setToggleListOptions(!toggleListOptions);
    setToggleRegisterOptions(false);
    toggleMenuDesktop(false);
  };

  const [toggleRegisterOptions, setToggleRegisterOptions] = useState(false);
  const handleToggleRegisterOptions = () => {
    setToggleRegisterOptions(!toggleRegisterOptions);
    setToggleListOptions(false);
    toggleMenuDesktop(false);
  };

  return (
    <aside className={`${styles.NavOptions} ${state.isViewMenuMobile ? styles['NavOptionsAnimantion'] : ''}`}>
      <ul className={styles.menu} onClick={handleToggleListOptions}>
        <li className={styles['option-menu']} onClick={handleToggleListOptions} onKeyDown={handleToggleListOptions}>
          <div className={styles['container-img']}>
            <Image src={iconList} alt="" />
          </div>
          <span className={styles['info-mobile']}>Opciones de consulta</span>
        </li>
        <li className={styles['option-menu']} onClick={handleToggleRegisterOptions} onKeyDown={handleToggleRegisterOptions}>
          <div className={styles['container-img']}>
            <Image src={iconSearch} alt="" />
          </div>
          <span className={styles['info-mobile']}>Opciones de registro</span>
        </li>
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

import React, { useState, useContext } from 'react';
import Image from 'next/image';

import AppContext from '@context/AppContext';

import iconList from '@icons/list_icon.svg';
import iconSearch from '@icons/register_icon.svg';
import iconSetings from '@icons/setings_icon.svg';

import styles from '@styles/NavDesktop.module.scss';

const NavDesktop = () => {
  const { state, toggleMenuNav } = useContext(AppContext);

  const [toggleListOptions, setToggleListOptions] = useState(false);
  const handleToggleListOptions = () => {
    setToggleListOptions(!toggleListOptions);
    setToggleRegisterOptions(false);
    toggleMenuNav(false);
  };

  const [toggleRegisterOptions, setToggleRegisterOptions] = useState(false);
  const handleToggleRegisterOptions = () => {
    setToggleRegisterOptions(!toggleRegisterOptions);
    setToggleListOptions(false);
    toggleMenuNav(false);
  };

  return (
    <aside className={styles.NavDesktop}>
      <ul className={styles.menu} onClick={handleToggleListOptions}>
        <li className={styles['option-menu']} onClick={handleToggleListOptions} onKeyDown={handleToggleListOptions}>
          <Image src={iconList} alt="" />
        </li>
        <li className={styles['option-menu']} onClick={handleToggleRegisterOptions} onKeyDown={handleToggleRegisterOptions}>
          <Image src={iconSearch} alt="" />
        </li>
      </ul>
      <div className={styles['config-btn']}>
        <Image src={iconSetings} alt='boton de configuraciones' />
      </div>
    </aside>
  );
};

export default NavDesktop;

import React, { useState, useContext } from 'react';
import Image from 'next/image';

import MenuNav from '@components/MenuDesktop';
import AppContext from '@context/AppContext';

import logoMS from '@logos/logo_msells.svg';
import iconPerson from '@icons/person_icon.svg';

import styles from '@styles/Header.module.scss';

const Header = () => {
  const { state, toggleMenuNav } = useContext(AppContext);

  const handleToggleD = () => {
    setToggleM(false);
    toggleMenuNav(!state.stateViewMenuNav);
  };

  const [toggleM, setToggleM] = useState(false);
  const handleToggleM = () => {
    setToggleM(!toggleM);
    toggleMenuNav(!state.stateViewMenuNav);
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
            <span>{state.user}</span>
          </li>
          <li className={styles['option-menu']}>
            <Image src={iconPerson} alt="" />
          </li>
        </ul>
      </div>
      {state.stateViewMenuNav && <MenuNav />}
    </nav>
  );
};

export default Header;

import React, { useContext } from 'react';
import styles from '@styles/SearchBar.module.scss';
import Image from 'next/image';

import iconSearch from '@icons/search_icon.svg';

const SearchBar = (props) => {
  const { entidad } = props;

  return (
    <div className={styles.SearchBar}>
      <input type='text' placeholder={`Buscar ${entidad}`} />
      <Image src={iconSearch} alt='Icono de busqueda' />
    </div>
  );
};

export default SearchBar;
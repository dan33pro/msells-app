import React from 'react';

import styles from '@styles/MainContainer.module.scss';

const MainConatiner = (props) => {
  const { title } = props;
  return (
    <div className={styles.MainConatiner}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default MainConatiner;

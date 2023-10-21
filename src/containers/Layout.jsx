import React from 'react';

import styles from '@styles/Layout.module.scss';

const Layout = ({ children }) => {
  return <div className={styles.Layout}>{children}</div>;
};

export default Layout;

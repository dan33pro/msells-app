import Image from 'next/image';
import styles from '@styles/containerLogin.module.scss';
import imageLogin from '@icons/iconLogin.svg';
import { useContext } from 'react';
import AppContext from '@context/AppContext';

export default function Login() {
  const { state } = useContext(AppContext);
  return (
    <section className={styles.Login}>
      <section className={styles.leftform}>
        <form className={styles.formulariologin}>
          <h2 className={styles.h2title}>Inicio Sesion</h2>
          <label className={styles.label}>Correo</label>
          <input type="email" name="correo" id="correo" className={styles.input} placeholder="ingrese su correo" />
          <label className={styles.label}>Password </label>
          <input type="password" name="password" id="password" className={styles.input} placeholder="ingrese su password" />
          <section className={styles.containerButton}>
            <input type="submit" value="Iniciar Sesion" className={styles.input} />
          </section>
        </form>
      </section>
      <section className={styles.rightform}>
        <Image src={imageLogin} alt="Imagen de fondo login" />
      </section>
    </section>
  );
}

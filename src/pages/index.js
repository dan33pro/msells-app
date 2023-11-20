import Image from 'next/image';
import styles from '@styles/containerLogin.module.scss';
import imageLogin from '@icons/iconLogin.svg';
import { useContext, useState } from 'react';
import AppContext from '@context/AppContext';
import loginService from '@services/api/loginService';


export default function Login() {
  const { state } = useContext(AppContext);
  const [formData, setFormData] = useState({email: '', password: ''});

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginService(formData.email, formData.password);
    } catch (error) {
      console.error('error al iniciar sesion', error);
    }
  };
  const handleInputChangue = (e) => {
    const{name, value } = e.target;
    setFormData({
      ...formData, 
      [name]: value, 
    }); 
  }; 
  return (
    <section className={styles.Login}>
      <section className={styles.leftform}>
        <form className={styles.formulariologin} onSubmit={handleLogin}>
          <h2 className={styles.h2title}>Inicio Sesion</h2>
          <label className={styles.label}>Correo</label>
          <input type="email" value={formData.email} name="email"  className={styles.input} placeholder="ingrese su correo" onChange={handleInputChangue} />
          <label className={styles.label}>Password </label>
          <input type="password" value={formData.password} name="password"  className={styles.input} placeholder="ingrese su password" onChange={handleInputChangue} />
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

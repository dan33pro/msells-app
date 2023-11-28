import Image from 'next/image';
import styles from '@styles/containerLogin.module.scss';
import imageLogin from '@icons/iconLogin.svg';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppContext from '@context/AppContext';
import useSesion from '@hooks/useSesion';
import loginService from '@services/api/loginService';


export default function Login() {
  const { state, changeSesionState,  changeUser} = useContext(AppContext);
  const [formData, setFormData] = useState({ correo: '', userPassword: '' });
  const router = useRouter();
  const { validSesion } = useSesion();

  useEffect(() => {
    if (validSesion()) {
      router.push('/main');
    }
  }, [state.sesion]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService(formData.correo, formData.userPassword);
      if(res.success) {
        changeSesionState(true, res.name, res.id_rol);
      }
    } catch (error) {
      console.error('error al iniciar sesion', error);
    }
  };
  const handleInputChangue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {!state.sesion &&
        <section className={styles.Login}>
          <section className={styles.leftform}>
            <form className={styles.formulariologin} onSubmit={handleLogin}>
              <h2 className={styles.h2title}>Inicio Sesion</h2>
              <label className={styles.label}>Correo</label>
              <input type="email" value={formData.correo} name="correo" className={styles.input} placeholder="ingrese su correo" onChange={handleInputChangue} />
              <label className={styles.label}>Password </label>
              <input type="password" value={formData.userPassword} name="userPassword" className={styles.input} placeholder="ingrese su password" onChange={handleInputChangue} />
              <section className={styles.containerButton}>
                <input type="submit" value="Iniciar Sesion" className={styles.input} />
              </section>
            </form>
          </section>
          <section className={styles.rightform}>
            <Image src={imageLogin} alt="Imagen de fondo login" />
          </section>
        </section>
      }
    </>
  );
}

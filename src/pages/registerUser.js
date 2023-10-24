import styles from '@styles/ContainerFormUser.module.scss';
import { useContext } from 'react';
import AppContext from '@context/AppContext';

export default function RegistroUsuario() {
  const { state } = useContext(AppContext);

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Usuario</h2>
        <form className={styles.formularioUsuario}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" placeholder="Ingrese su nombre" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Apellido </label>
              <input type="text" placeholder="Ingrese su apellido" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Email </label>
              <input type="email" placeholder="Ingrese su correo" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Confirmar Email </label>
              <input type="email" placeholder="Ingrese su email" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Telefono </label>
              <div className={styles.containerPhone}>
                <select name="codPais" id="CodPais" className={styles.select}>
                  <option value="+57" className={styles.option}>
                    57
                  </option>
                </select>
                <input type="number" placeholder="Ingrese su telefono" className={styles.input} />
              </div>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Password </label>
              <input type="password" placeholder="Ingrese su password" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Confirmar Password </label>
              <input type="password" placeholder="Ingrese su password" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Tipo de rol </label>
              <select name="tipoRol" id="tipoRol" className={styles.select}>
                <option value="" className={styles.option}></option>
                <option value="" className={styles.option}></option>
                <option value="" className={styles.option}></option>
              </select>
            </div>
            <div className={styles.inputbox}>
              <div className={styles.containerButton}>
                <input type="submit" value="Registrar" className={styles.input} />
                <input type="submit" value="Cancelar" className={styles.input} />
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

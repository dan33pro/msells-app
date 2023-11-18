import styles from '@styles/ContainerFormUser.module.scss';
import { useContext } from 'react';
import AppContext from '@context/AppContext';

export default function RegistroCliente() {
  const { state } = useContext(AppContext);

  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.containerUser}>
        <h2 className={styles.title}>Crear Cliente</h2>
        <form className={styles.formularioUsuario}>
          <div className={styles.detalleUsuario}>
            <div className={styles.inputbox}>
              <label className={styles.details}>Nombre </label>
              <input type="text" name='nombre' id='nombre' placeholder="Ingrese su nombre" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Email </label>
              <input type="email" name='email' id='name' placeholder="Ingrese su correo" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Apellido </label>
              <input type="text" name='apellido' id='apellido' placeholder="Ingrese su apellido" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Telefono </label>
              <div className={styles.containerPhone}>
                <select name="codPais" id="CodPais" className={styles.select}>
                  <option value="+57" className={styles.option}>
                    57
                  </option>
                </select>
                <input type="number" name='telefono' id='telefono' placeholder="Ingrese su telefono" className={styles.input} />
              </div>
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Direccion </label>
              <input type="text" name='direccion' id='direccion' placeholder="Ingrese su direccion" className={styles.input} />
            </div>
            <div className={styles.inputbox}>
              <label className={styles.details}>Ruta </label>
              <select name="Ruta" id="Ruta" className={styles.select}>
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

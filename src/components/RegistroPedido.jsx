import Image from 'next/image';
import styles from '@styles/ContainerFormPedido.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import imagePedido from '@icons/pedido.svg';
import userStorage from '@services/api/userStorage';
import pedidoService from '@services/api/orderService';

const RegistroPedido = () => {
  const { state, toggleRegisterPedido } = useContext(AppContext);

  const [formData, setFormData] = useState({
    notas: '',
    id_estado: 1,
    id_cliente: 0,
    fecha: '',
    total: '0',
    id_usuario: 0,
    accion: 'insert',
  });

  useEffect(() => {
    const userDataString = userStorage.getUserData();
    if (userDataString && userDataString.id_usuario) {
      const idVendedor = parseInt(userDataString.id_usuario, 10);

      if (!isNaN(idVendedor)) {
        setFormData((prevData) => ({
          ...prevData,
          id_usuario: idVendedor,
        }));
      }
    }
    if(state?.elements?.client) {
      setFormData((prevData) => ({
        ...prevData,
        id_cliente: state.elements.client.idCliente,
      }));
    }
  }, [state.elements.client]);

  const handleRegistrarPedido = async (e) => {
    e.preventDefault();
    try {
      const response = await pedidoService.registrarPedido(formData);
      console.log(formData);
      if (response.success) {
        alert('Pedido registrado exitosamente');
        setTimeout(() => {
          handleCancelar();
        }, 2000);
      } else {
        alert('Error al registrar el pedido del cliente con id', formData.id_cliente);
      }
    } catch (error) {
      console.error('error al enviar los datos ', error);
    }
  };

  const handleInputChangue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleCancelar = () => {
    toggleRegisterPedido(false);
   };


  return (
    <section className={styles.containerPrinciple}>
      <section className={styles.rightform}>
        <Image src={imagePedido} alt="Imagen de pedido" />
      </section>
      <section className={styles.leftForm}>
        <form className={styles.form} onSubmit={handleRegistrarPedido}>
          <h2 className={styles.title}>Crear Pedido</h2>
          <label className={styles.labelInfo}><span className={styles.bold}>ID Cliente:</span> {state.elements.client.idCliente}</label>
          <label className={styles.labelInfo}><span className={styles.bold}>Nombre:</span> {state.elements.client.fullName}</label>
          <label className={styles.label}>Fecha Pedido</label>
          <input type="date" name="fecha" className={styles.input} placeholder="seleccione la fecha del pedido" value={formData.fecha} onChange={handleInputChangue} required />
          <div className={styles.inputboxDescripcion}>
            <label className={styles.label}> Notas </label>
            <textarea name="notas" id="notas" cols="105" rows="20" className={styles.textarea} value={formData.notas} onChange={handleInputChangue} required></textarea>
          </div>
          <section className={styles.containerButton}>
            <input type="submit" value="Registrar" className={styles.input} />
            <input type="submit" value="Cancelar" className={styles.input} onClick={handleCancelar}/>
          </section>
        </form>
      </section>
    </section>
  );
}

export default RegistroPedido;
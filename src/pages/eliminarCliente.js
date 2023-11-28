import Image from 'next/image';
import styles from '@styles/ContainerDeleteClient.module.scss';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import imageUser from '@icons/imagen.svg';
import userStorage from '@services/api/userStorage';
import clientService from '@services/api/clientService';

export default function EliminarCliente() {
  const { state } = useContext(AppContext);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: 0,
  });
  useEffect(() => {
    const userDataString = userStorage.getUserData();
    if (userDataString && userDataString.id_usuario) {
      const idUser = parseInt(userDataString.id_usuario, 10);
      if (!isNaN(idUser)) {
        setFormData((prevData) => ({
          ...prevData,
          id_usuario: idUser,
        }));
        console.log('el id del usuario es: ', idUser);
      } else {
        console.error('el id del usuario no es valido. ');
      }
    } else {
      console.error('No se encontro el id del usuario');
    }
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientService.obtenerClientes();
        setClients(response.data.body);
      } catch (error) {
        console.error('Error al obtener la informacion del cliente', error);
      }
    };
    fetchClients();
  }, []);

  const handleEliminarCliente = async (idCliente, event) => {
    event.preventDefault();

    try {

      console.log(idCliente, formData.id_usuario)
      const response = await clientService.deleteClient(idCliente, formData.id_usuario);

      if (response.success) {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id_cliente !== idCliente)
        );
        alert('Cliente eliminado exitosamente');
      } else {
        alert('No se puede eliminar este cliente porque el id esta siendo utilizado en un pedido');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de eliminación', error);
    }
  };

  return (
    <section className={styles.containerPrinciple}>
      <form className={styles.form}>
        <h2 className={styles.title}>Eliminar Cliente</h2>
        <article className={styles.contenedor}>
          {Array.isArray(clients) &&
            clients.length > 0 &&
            clients.map((client) => (
              <div key={client.id_cliente} className={styles.diseño1}>
                <Image src={imageUser} alt="Imagen de Usuario" />
                <span className={styles.span}>{`${client.nombres}  ${client.apellidos}`}</span>
                <button
                  className={styles.eliminarButton}
                  onClick = {
                    (event) => handleEliminarCliente(client.id_cliente, event)
                  } >
                  Eliminar
                </button>
              </div>
            ))}
        </article>
      </form>
    </section>
  );
}
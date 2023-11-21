import styles from '@styles/CardDetail.module.scss';
import AppContext from '@context/AppContext';
import { useContext } from 'react';

const CardDetail = (props) => {
  const {
    changeCurrentRuta,
    changeCurrentCliente,
    changeCurrentPedido,
    toggleConsultarRutas,
    toggleConsultarPedidos,
    toggleviewConsultarClientes,
    togglePedidoDetail} = useContext(AppContext);
  const { cardDetail } = props;
  const { title, description, caracteristics, buttons } = cardDetail;

  const handler = (e) => {
    let idRuta = ''
    let option = e.target.value.split(" ")[1];
    console.log(idRuta);
    switch(option) {
      case "clientes":
        toggleConsultarRutas(false);
        idRuta = caracteristics.find(c => c.includes("ID-Ruta: ")).split("ID-Ruta: ")[1];
        changeCurrentRuta(idRuta);

        toggleviewConsultarClientes(true);
        break;
      case "pedidos":
        toggleConsultarRutas(false);
        idRuta = caracteristics.find(c => c.includes("ID-Ruta: ")).split("ID-Ruta: ")[1];
        changeCurrentRuta(idRuta);

        toggleConsultarPedidos(true);
        break;
      case "Pedido":
        let contactInfo = (description.split("contactar al cliente a través de: Correo: ")[1]).split(" - Número: ");
        let infoClient = caracteristics.map(c => c.split(": ")[1]);
        changeCurrentCliente({
          fullName: title,
          mail: contactInfo[0],
          phone: contactInfo[1],
          idCliente: infoClient[1],
          address: infoClient[3],
        });
        changeCurrentPedido(infoClient[0]);
        togglePedidoDetail(true);
        break;
    }
  }

  return (
    <div className={styles.CardDetail}>
      <span className={styles.title}>{title}</span>
      <p className={styles.description}>{description}</p>
      <div className={styles.caracteristics}>
        {caracteristics.map((caracteristic) => <span>{caracteristic}</span>)}
      </div>
      <div className={styles['container-btns']}>
        {buttons.map((btn) => <button onClick={handler} onKeyDown={handler} className={`${styles['btn']} ${styles[`${btn.classN}`]}`} value={btn.description}>{btn.description}</button>)}
      </div>
    </div>
  );
};

export default CardDetail;

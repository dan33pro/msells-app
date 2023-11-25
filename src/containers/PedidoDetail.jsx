import styles from '@styles/PedidoDetail.module.scss';
import Image from 'next/image';

import AppContext from '@context/AppContext';
import { useContext, useState, useEffect } from 'react';

import useOrders from '@hooks/useOrders';
import useProduct from '@hooks/useProduct';

import { format } from 'date-fns';
import es from 'date-fns/locale/es';

import closeIcon from '@icons/close_icon.svg';
import ContentPane from './ContentPane';

import orderDetailService from '@services/api/orderDetailService';

const PedidoDetail = () => {
    const {state, togglePedidoDetail} = useContext(AppContext);
    const [myOrder, setMyOrder] = useState({});
    const [products, setProducts] = useState([]);
    const myOrderer = useOrders();
    const myProducter = useProduct();

    const updateProducts = (cardsProduct) => {
        setProducts(cardsProduct);
    };

    const restartProducts = () => {
        setProducts([]);
    };

    const changeMyOrdre = (newOrder) => {
        setMyOrder(newOrder);
    };

    useEffect(() => {
        (async () => {
            if (state.elements.pedido && !isNaN(state.elements.pedido)) {
                let order = await myOrderer.consultarPedido(parseInt(state.elements.pedido));
                if(order) {
                    changeMyOrdre(order);
                    let orderDetailRes = await orderDetailService.obtenerDetallesPedidosPorAtributo({ key: 'id_pedido', value: parseInt(state.elements.pedido)})
                    if(orderDetailRes.success) {
                        let orderDetails = orderDetailRes.data.body;
                        if (products.length != 0) {
                            restartProducts();
                        }
                        let myCards = await myProducter.obtenerCardsProductsDetail(orderDetails);
                        updateProducts(myCards);
                    }
                }
            }
        })();
    }, [(state?.elements?.pedido)]);

    const closeView = () => {
        togglePedidoDetail(false);
    };

    return (
        <aside className={styles.PedidoDetail}>
            <nav className={styles.titleSection}>
                <h2>Detalle Pedidio</h2>
                <button onClick={closeView} onKeyDown={closeView}>
                    <Image src={closeIcon} alt='close icon' width={30} height={30} />
                </button>
            </nav>
            <header className={styles['info-client']}>
                <div className={styles.firstColumn}>
                    <p>
                        <span className={styles.bold}>ID_Pedido: {state?.elements?.pedido}</span>
                    </p>
                    <p>
                        <span className={styles.bold}>{state?.elements?.client?.fullName}</span>
                    </p>
                </div>
                <div className={styles.middleColumn}>
                    <p>
                        <span className={styles.bold}>ID-Cliente: </span>
                        <span>{state?.elements?.client?.idCliente}</span>
                    </p>
                    <p>
                        <span className={styles.bold}>Dirección: </span>
                        <span>{state?.elements?.client?.address}</span>
                    </p>
                </div>
                <div className={state.lastColumn}>
                    <p>Puede contactar al cliente a través de:</p>
                    <p>
                        <span className={styles.bold}>Correo: </span>
                        <span>{state?.elements?.client?.mail}</span>
                    </p>
                    <p>
                        <span className={styles.bold}>Número: </span>
                        <span>{state?.elements?.client?.phone}</span>
                    </p>
                </div>
            </header>
            <ContentPane filtros={[]} cardsDetail={products} cardElement='ProductCard' />
            <bottom className={styles['info-pedido']}>
                <div className={styles.middleColumn}>
                    <p>
                        <span className={styles.bold}>Estado: </span>
                        <span>{myOrder?.id_estado == 1 ? 'No entregado' : myOrder?.id_estado == 2 ? 'Entregado' : 'Devuelto'}</span>
                    </p>
                    <p>
                        <span className={styles.bold}>Fecha de Preventa: </span>
                        <span>{myOrder?.fecha && format(new Date(myOrder.fecha), 'dd/MM/yyyy hh:mm a', { locale: es })}</span>
                    </p>
                </div>
                <p className={styles.totalPedido}>
                    <span className={styles.bold}>Total: </span>
                    <span>${myOrder?.total}</span>
                </p>
            </bottom>
        </aside>
    )
};

export default PedidoDetail;
import styles from '@styles/PedidoDetail.module.scss';
import Image from 'next/image';

import AppContext from '@context/AppContext';
import { useContext, useState } from 'react';

import closeIcon from '@icons/close_icon.svg';
import ContentPane from './ContentPane';
import {CardProduct} from '@hooks/useEntidades';
import productImage from '@images/product_image.svg'; 

const productCardForList = new CardProduct({
    nameProduct: 'Nombre de un producto',
    description: 'Cantidad: 4 - Precio Unitario: $2000 - Precio total: $8000',
    caracteristics: ['ID: Producto', 'Tipo/producto ', 'Empresa: Nombre'],
    img: productImage,
});

let productsUtil = [];
for (let i = 0; i < 5; i++) {
    productsUtil.push(productCardForList);
}

const PedidoDetail = () => {
    const {state, togglePedidoDetail} = useContext(AppContext);

    const closeView = () => {
        togglePedidoDetail(false);
    }

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
                        <span className={styles.bold}>ID: #Pedido</span>
                    </p>
                    <p>
                        <span className={styles.bold}>{state?.elements?.client?.fullName}</span>
                    </p>
                </div>
                <div className={styles.middleColumn}>
                    <p>
                        <span className={styles.bold}>CC: </span>
                        <span>{state?.elements?.client?.cedulaCliente}</span>
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
            <ContentPane filtros={[]} cardsDetail={productsUtil} cardElement='ProductCard' />
            <bottom className={styles['info-pedido']}>
                <div className={styles.middleColumn}>
                    <p>
                        <span className={styles.bold}>Estado: </span>
                        <span>No entregado</span>
                    </p>
                    <p>
                        <span className={styles.bold}>Fecha de Preventa: </span>
                        <span>10/10/23</span>
                    </p>
                </div>
                <p className={styles.totalPedido}>
                    <span className={styles.bold}>Total: </span>
                    <span>$80000</span>
                </p>
            </bottom>
        </aside>
    )
};

export default PedidoDetail;
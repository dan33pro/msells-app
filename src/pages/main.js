import Layout from '@containers/Layout';
import MainConatiner from '@containers/MainContainer';
import Header from '@components/Header';
import NavOptions from '@components/NavOptions';
import useSesion from '@hooks/useSesion';
import { useRouter } from 'next/router';

import AppContext from '@context/AppContext';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import PedidoDetail from '@containers/PedidoDetail';
import OpcionesConsultaMixta from '@components/OpcionesConsultaMixta';
import OpcionesConsultaDelivery from '@components/OpcionesConsultaDelivery';
import OpcionesRegistroAdmin from '@components/OpcionesRegistrosAdmin';
import OpcionesRegistroVendedor from '@components/OpcionesRegistrosVendedor';
import RegistroUsuario from '@components/RegisterUser';

export default function Home() {
  const { state, changeSesionState } = useContext(AppContext);
  const router = useRouter();
  const { validSesion, getUserData } = useSesion();

  useEffect(() => {
    if (!validSesion()) {
      router.push('/');
    } else if (!state.sesion) {
      let user = getUserData();
      changeSesionState(true, user.nombres, user.rol);
    }
  }, [state.sesion]);

  return (
    <>
      {state.sesion && (
        <>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <NavOptions />
          <Layout>
            {state.viewConsultarRutas.stateView && <MainConatiner currentView={state.viewConsultarRutas} />}
            {state.viewConsultarPedidos.stateView && <MainConatiner currentView={state.viewConsultarPedidos} />}
            {state.viewConsultarClientes.stateView && <MainConatiner currentView={state.viewConsultarClientes} />}
            {state.viewConsultarProductos.stateView && <MainConatiner currentView={state.viewConsultarProductos} />}

            {state.isViewPedidoDetail && <PedidoDetail />}

            {state.isViewOCMixta && <OpcionesConsultaMixta />}
            {state.isViewOCDevivery && <OpcionesConsultaDelivery />}

            {state.isViewORAdmin && <OpcionesRegistroAdmin />}
            {state.isViewORVendedor && <OpcionesRegistroVendedor />}

            {state.isViewRegisterUser && <RegistroUsuario />}
          </Layout>
        </>
      )}
    </>
  );
}

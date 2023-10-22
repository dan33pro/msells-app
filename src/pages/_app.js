import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import Header from '@components/Header';
import Script from 'next/script';

import '@styles/globals.scss';
import NavOptions from '@components/NavOptions';

export default function App({ Component, pageProps }) {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-C689L541VP" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C689L541VP');
        `}
      </Script>
      <Header />
      <NavOptions />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

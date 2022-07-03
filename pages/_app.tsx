// @ts-nocheck
import React, { useEffect } from "react";
import GlobalStyles from 'components/gloablStyle'
import type { AppProps } from "next/app";
import DarkProvider from "lib/theme/index";
import { THEME } from 'src/constants'
import { ThemeProvider } from 'styled-components'
import Router from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    Router.events.on("routeChangeComplete",(e)=>{
      console.log(e);
    })
  },[])
  return (
    <ThemeProvider theme={THEME} >
      <DarkProvider>
        <Component {...pageProps} />
        <GlobalStyles />
      </DarkProvider>
    </ThemeProvider>
  );
}

export default MyApp;

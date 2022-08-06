// @ts-nocheck
import React, { useEffect } from "react";
import GlobalStyles from 'components/gloablStyle'
import type { AppProps } from "next/app";
import DarkProvider from "lib/theme/index";
import { THEME } from 'src/constants'
import { ThemeProvider } from 'styled-components'
import Router from "next/router";
import logger from "hui-weblog"
import  'antd/lib/table/style/index.css'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(()=>{
    const Logger = logger.init({
      url: "/api/logger",
    })

    Logger.register({
      target: Router.events.on,
      type: "routeChangeComplete",
      listener: (e)=>{
        return {
          url:  decodeURIComponent(e)
        }
      }
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

// @ts-nocheck
import React, { useEffect } from "react";
import GlobalStyles from 'src/components/gloablStyle'
import type { AppProps } from "next/app";
import { useRouter } from 'next/router'
import DarkProvider from "src/lib/theme/index";
import { THEME } from 'src/constants'
import { ThemeProvider } from 'styled-components'
import Router from "next/router";
import logger from "hui-weblog"
import  'antd/lib/table/style/index.css'
import  "antd/lib/message/style/index.css";
import  "antd/lib/form/style/index.css";
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

export function reportWebVitals(metric) {
  console.log(metric)
}
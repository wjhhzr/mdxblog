// @ts-nocheck
import React, { useEffect } from "react";
import GlobalStyles from 'components/gloablStyle'
import type { AppProps } from "next/app";
import DarkProvider from "lib/theme/index";
import { THEME } from 'src/constants'
import { ThemeProvider } from 'styled-components'
function MyApp({ Component, pageProps }: AppProps) {

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

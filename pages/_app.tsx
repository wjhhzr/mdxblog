// @ts-nocheck
import React, { useEffect } from "react";
import GlobalStyles from 'components/gloablStyle'
import type { AppProps } from "next/app";
import ThemeProvider from "lib/theme/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default MyApp;

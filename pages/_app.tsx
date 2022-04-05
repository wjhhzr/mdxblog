import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import ThemeProvider from "lib/theme/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

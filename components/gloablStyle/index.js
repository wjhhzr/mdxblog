import React from 'react';
import { createGlobalStyle } from 'styled-components';

const COLOR_SWAP_TRANSITION_DURATION = 300
const GlobalStyles = createGlobalStyle`
  /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/global-styles/
  */

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    line-height: 1.5;
    line-height: calc(1em + 0.725rem);
    -webkit-font-smoothing: antialiased;
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  ul {
    padding: 0;
  }

  #__next {
    isolation: isolate;
  }

  /* Global styles */

  body {
    color: var(--color-text);
    background: var(--color-background);
    transition: ${(p) => {
      return `color ${COLOR_SWAP_TRANSITION_DURATION}ms linear, background ${COLOR_SWAP_TRANSITION_DURATION}ms linear`;
    }};
    -webkit-tap-highlight-color: transparent;
  }

  a:focus {
    outline: 5px auto var(--color-primary);
  }

  a {
    color: var(--color-primary);
  }

  body, input, button, select, option {
    font-weight: var(--font-weight-light);
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: var(--font-weight-bold);
  }

  code {
    font-size: 0.95em;
  }

  /* Scrollbar and selection styles */
  ::selection {
    background-color: var(--selection-background, var(--color-primary));
    color: var(--selection-text, white);
    background-image: none !important;
    -webkit-text-fill-color: var(--selection-text) !important;
    -moz-text-fill-color: var(--selection-text) !important;
    background-image: none !important;
    background-clip: revert !important;
    -webkit-background-clip: revert !important;
    text-shadow: none !important;
  }


  /* @font-face {
    font-family: MYFONT;
    font-display: swap;
    src:url('/font/syht/PingFangSC-Regular.woff2') format('woff2');
  } */

  /* CSS Variables */
  :root {
    --font-weight-bold: 600;
    --font-weight-medium: 500;
    --font-weight-light: 400;
    --font-family: Helvetica,"Microsoft YaHei", Arial, sans-serif;
    --font-family-mono: 'League Mono', 'Fira Mono', monospace;
    --font-family-spicy: 'Sriracha', 'Wotfard', Futura, -apple-system, sans-serif;

    /* HACK:
      Reach UI tests for loaded styles, but I'm providing my own.
      This is to avoid a noisy warning in dev.
    */
   --reach-dialog: 1;
  }



  .video-js .vjs-big-play-button {
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    margin: auto !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
    background-color: rgba(0, 0, 0, 0.4) !important;
  }

  .video-js .vjs-play-progress:before {
    top: -0.6em !important;
  }

  .vjs-slider-horizontal .vjs-volume-level:before {

    top: -0.6em !important;
  }
`;

const GlobalStylesWrapper = (props) => {
  return <GlobalStyles {...props} />;
};

export default React.memo(GlobalStylesWrapper);

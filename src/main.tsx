import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { colors, createTheme, ThemeProvider } from '@mui/material';

import nunitoWoff from './assets/nunito-v25-latin-regular.woff';
import nunitoWoff2 from './assets/nunito-v25-latin-regular.woff2';

import App from './App';

import { Settings } from 'luxon';

Settings.defaultLocale = 'fi';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    src: local(''), url(${nunitoWoff2}) format('woff2'), url(${nunitoWoff}) format('woff');
  }

  html {
    height: 100%;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  body {
    margin: 0;
    height: 100%;
  }

  #root {
    font-family: 'Nunito', sans-serif;
    line-height: 24px;
    font-weight: 400;

    color: ${colors.grey[900]};

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    width: 100%;
    height: 100%;
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito';
          font-style: normal;
          font-weight: 400;
          src: local(''), url(${nunitoWoff2}) format('woff2'), url(${nunitoWoff}) format('woff');
        }
      `,
    },
  },
  palette: {
    primary: { main: colors.blueGrey[800] },
    secondary: { main: colors.grey[700] },
    error: { main: colors.red[900] },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

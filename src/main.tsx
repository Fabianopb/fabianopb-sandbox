import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createGlobalStyle } from 'styled-components';

import nunitoWoff from './assets/nunito-v25-latin-regular.woff';
import nunitoWoff2 from './assets/nunito-v25-latin-regular.woff2';

import App from './App';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url(${nunitoWoff2}) format('woff2'),
      url(${nunitoWoff}) format('woff');
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
  }

  #root {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #242424;
    background-color: #fff;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    width: 100%;
    height: 100%;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

import { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from '../components/Header';
import createEmotionCache from '../lib/theme/createEmotionCache';
import lightTheme from '../lib/theme/lightTheme';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (
  props: AppProps & {
    emotionCache: EmotionCache;
  },
) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Header />
        <Component {...pageProps} />
        <ToastContainer autoClose={5000} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

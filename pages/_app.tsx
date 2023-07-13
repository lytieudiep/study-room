import React, {useState} from 'react';
import '../stylesheets/globals.css';

import "../stylesheets/styles.css";



interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any;
  }
  

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
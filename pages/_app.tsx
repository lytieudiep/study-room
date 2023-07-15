import React, { useState } from 'react';
import '../stylesheets/globals.css';

import "../stylesheets/styles.css";
import { SessionProvider } from "next-auth/react";


interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}


function MyApp({ Component, pageProps }: MyAppProps) {
  let { session } = pageProps;
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>;
}

export default MyApp;
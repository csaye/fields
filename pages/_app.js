import Head from 'next/head';

import { useEffect, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../util/firebaseConfig';

import '../styles/globals.css';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  const { Component, pageProps } = props;

  const [authed, setAuthed] = useState(undefined);

  const auth = getAuth();

  // listen for user auth
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(() => {
      setAuthed(!!auth.currentUser);
    });
    return () => authListener();
  }, []);

  return (
    <>
      <Head>
        <title>Fields</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component authed={authed} {...pageProps} />
    </>
  );
}

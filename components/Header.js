import Link from 'next/link';

import signInWithGoogle from '../util/signInWithGoogle';
import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/game">
        <a>Game</a>
      </Link>
      {
        auth.currentUser ?
        <button onClick={() => signOut(auth)}>
          Sign Out
        </button> :
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      }
    </div>
  );
}

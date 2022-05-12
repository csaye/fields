import signInWithGoogle from '../util/signInWithGoogle';
import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <h1>Fields</h1>
      <span className="flexfill" />
      {
        auth.currentUser ?
        <button
          className="textbutton"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </button> :
        <button
          className="textbutton"
          onClick={signInWithGoogle}
        >
          Sign In
        </button>
      }
    </div>
  );
}

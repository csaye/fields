import Header from '../components/Header';
import GameView from '../components/GameView';

import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index(props) {
  const { authed } = props;

  return (
    <div className={styles.container}>
      <Header />
      {
        authed ?
        <GameView /> :
        authed === false ?
        <div className={styles.centered}>
          <div className={styles.center}>
            <h1>Fields</h1>
            <button
              className="textbutton"
              onClick={signInWithGoogle}
            >
              Sign In
            </button>
          </div>
        </div> :
        <div className={styles.center}>
          <p>Loading...</p>
        </div>
      }
    </div>
  );
}

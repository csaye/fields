import Header from '../components/Header';
import GameView from '../components/GameView';

import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index(props) {
  const { authed } = props;

  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
}

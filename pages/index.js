import Header from '../components/Header';
import GameView from '../components/GameView';

import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';


export default function Index() {
  const auth = getAuth();
  const db = getFirestore();

  const canvasRef = useRef();

  const uid = auth.currentUser.uid;
  const userRef = doc(db, 'players', uid);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    draw();
  }, [width, height]);

  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
}

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

  // get canvas on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    // initialize dimensions
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    // set up resize listener
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    draw();
  }, [width, height]);

  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
}

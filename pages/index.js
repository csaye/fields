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

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    // wider than tall
    ctx.fillStyle = 'white';
    const tileSize = (width > height ? width : height) / mapSize;
    const diff = (width > height ? width - height : height - width) / 2;
    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const tileX = x * tileSize + border - (width > height ? 0 : diff);
        const tileY = y * tileSize + border - (width > height ? diff : 0);
        ctx.fillRect(tileX, tileY, tileSize - border * 2, tileSize - border * 2);
      }
    }
    // fill player
    ctx.fillStyle = 'red';
    const playerX = midMap * tileSize + border - (width > height ? 0 : diff);
    const playerY = midMap * tileSize + border - (width > height ? diff : 0);
    ctx.fillRect(playerX, playerY, tileSize - border * 2, tileSize - border * 2);
  }

  // called on window resize
  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  // moves player in given direction
  async function movePlayer(direction) {
    let deltaX = 0;
    let deltaY = 0;
    if (direction === 'up') deltaY += 1;
    if (direction === 'down') deltaY -= 1;
    if (direction === 'left') deltaX -= 1;
    if (direction === 'right') deltaX += 1;
    await userRef.update({
      x: increment(deltaX),
      y: increment(deltaY)
    });
  }

  // called on key press
  function onKeydown(e) {
    const key = e.key.toLowerCase();
    if (key === 'w') movePlayer('up');
    else if (key === 'a') movePlayer('left');
    else if (key === 's') movePlayer('down');
    else if (key === 'd') movePlayer('right');
  }

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

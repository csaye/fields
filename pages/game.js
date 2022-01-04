import { useEffect, useRef } from 'react';

import styles from '../styles/pages/Game.module.css';

let canvas;
let ctx;

export default function Game() {
  const canvasRef = useRef();

  // get canvas on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <h1>Game</h1>
      <canvas ref={canvasRef} />
    </div>
  );
}

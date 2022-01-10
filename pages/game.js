import { useEffect, useRef, useState } from 'react';

import styles from '../styles/pages/Game.module.css';

let canvas;
let ctx;

export default function Game() {
  const canvasRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // called on window resize
  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
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
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}

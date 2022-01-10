import { useEffect, useRef, useState } from 'react';

import styles from '../styles/pages/Game.module.css';

const mapSize = 10;

let canvas;
let ctx;

export default function Game() {
  const canvasRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    // wider than tall
    ctx.fillStyle = 'white';
    if (width > height) {
      const tileSize = width / mapSize;
      const diff = -(width - height) / 2;
      for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
          ctx.fillRect(x * tileSize + 1, diff + y * tileSize + 1, tileSize - 2, tileSize - 2);
        }
      }
    // taller than wide
    } else {
      const tileSize = height / mapSize;
      const diff = -(height - width) / 2;
      for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
          ctx.fillRect(diff + x * tileSize + 1, y * tileSize + 1, tileSize - 2, tileSize - 2);
        }
      }
    }
  }

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

  useEffect(() => {
    draw();
  }, [width, height]);

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

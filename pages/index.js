import Header from '../components/Header';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/pages/Index.module.css';

const mapSize = 15;
const border = 1;

let canvas;
let ctx;

export default function Index() {
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
    const tileSize = (width > height ? width : height) / mapSize;
    const diff = (width > height ? width - height : height - width) / 2;
    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const tileX = x * tileSize + border - (width > height ? 0 : diff);
        const tileY = y * tileSize + border - (width > height ? diff : 0);
        ctx.fillRect(tileX, tileY, tileSize - border * 2, tileSize - border * 2);
      }
    }
  }

  // called on window resize
  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
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
    <div>
      <Header />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}

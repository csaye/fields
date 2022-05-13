import styles from '../styles/components/GameView.module.css';

import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, increment, collection, doc, updateDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const mapSize = 15;
const midMap = Math.floor(mapSize / 2);
const border = 1;

let canvas;
let ctx;

export default function GameView() {
  const auth = getAuth();
  const db = getFirestore();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const canvasRef = useRef();

  const uid = auth.currentUser.uid;

  const playersRef = collection(db, 'players');
  const [players] = useCollectionData(playersRef, { idField: 'id' });
  const player = players?.find(player => player.id === uid);
  const playerRef = doc(playersRef, uid);

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    // draw grid
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
    if (!player || !players) return;
    // draw player
    ctx.fillStyle = player.color;
    const playerX = midMap * tileSize + border - (width > height ? 0 : diff);
    const playerY = midMap * tileSize + border - (width > height ? diff : 0);
    ctx.fillRect(playerX, playerY, tileSize - border * 2, tileSize - border * 2);
    // draw other players
    for (const otherPlayer of players) {
      if (otherPlayer === player) continue;
      ctx.fillStyle = otherPlayer.color;
      const playerX = (otherPlayer.x - player.x + midMap) * tileSize + border - (width > height ? 0 : diff);
      const playerY = (player.y - otherPlayer.y + midMap) * tileSize + border - (width > height ? diff : 0);
      ctx.fillRect(playerX, playerY, tileSize - border * 2, tileSize - border * 2);
    }
  }
  return (
    <div>
    </div>
  );
}

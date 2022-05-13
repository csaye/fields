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
  return (
    <div>
    </div>
  );
}

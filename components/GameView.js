import styles from '../styles/components/GameView.module.css';

import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, increment, collection, doc, updateDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
export default function GameView() {
  return (
    <div>
    </div>
  );
}

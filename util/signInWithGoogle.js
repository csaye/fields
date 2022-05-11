import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

// creates player doc if none existing
async function createPlayer() {
  // get player doc
  const uid = auth.currentUser.uid;
  const playerRef = doc(db, 'players', uid);
  const playerDoc = await getDoc(playerRef);
  // return if existing doc
  if (playerDoc.exists()) return;
  // create player doc
  await setDoc(playerRef, {
    joined: new Date().getTime(),
    x: 0,
    y: 0,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
  });
}

// opens google sign in popup
export default async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  createPlayer();
}

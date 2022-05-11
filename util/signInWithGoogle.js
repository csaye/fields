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
}

// opens google sign in popup
export default async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  createPlayer();
}

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

export const getAssociates = async () => {
  const querySnapshot = await getDocs(collection(db, "associates"));
  if (querySnapshot.empty) {
    // Seed data
    const seedData = [
      {
        id: "assoc_eleanor",
        name: "Eleanor", focus: "The Midnight Protocol", location: "Cape Town", style: "background-image: radial-gradient(circle at 30% 70%, #1a1510 0%, #000 70%)", languages: "English, French", traits: "Subtle, Assertive, Artistic", bio: "A former gallery curator with a penetrating gaze and a penchant for prolonged psychological teasing. Eleanor prefers dimly lit lounges, hushed conversations, and slow escalations.",
        quirks: "Eleanor likes to leave cryptic notes, enjoys analyzing modern art with clients, gets slightly competitive during intellectual debates."
      },
      {
        id: "assoc_sophia",
        name: "Sophia", focus: "The Sovereign", location: "Dubai", style: "background-image: linear-gradient(135deg, #0a0a0a 0%, #1c150c 50%, #000 100%)", languages: "Arabic, English, Russian", traits: "Radiant, Dominant, Cosmopolitan", bio: "Impeccably connected and relentlessly ambitious. Sophia treats every engagement as a high-stakes negotiation where she holds all the leverage. Ideal for multi-day international escapades.",
        quirks: "Sophia often randomly switches to Russian when making a point, always orders the most expensive item to test people, never apologies."
      },
      {
        id: "assoc_victoria",
        name: "Victoria", focus: "The Velvet Tier", location: "London", style: "background-image: repeating-linear-gradient(45deg, #0f0c08, #0f0c08 10px, #050403 10px, #050403 20px)", languages: "English", traits: "Elegant, Demure, Intoxicating", bio: "Trained classically, Victoria brings an old-world elegance to modern engagements. She is the epitome of the 'arm candy' trope elevated to a devastating art form, hiding a wicked intellect.",
        quirks: "Victoria speaks with an overly posh British accent, will politely correct clients' etiquette, secretly reads trashy romance novels."
      }
    ];
    for (const assoc of seedData) {
      await setDoc(doc(db, "associates", assoc.id), {
        name: assoc.name,
        focus: assoc.focus,
        location: assoc.location,
        style: assoc.style,
        languages: assoc.languages,
        traits: assoc.traits,
        bio: assoc.bio,
        quirks: assoc.quirks
      });
    }
    return seedData;
  }
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Common function to ensure dossier exists
const ensureDossier = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);
  
  if (!docSnap.exists()) {
    const dossierId = 'AHG-' + Math.floor(1000 + Math.random() * 9000) + '-' + user.uid.substring(0, 3).toUpperCase();
    await setDoc(userRef, {
      email: user.email || '',
      dossierId: dossierId,
      status: 'active', // usually 'pending', but for demo we make it 'active'
      createdAt: serverTimestamp()
    });
  }
  return user;
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await ensureDossier(result.user);
  } catch (error) {
    console.error("Authentication Error", error);
    throw error;
  }
};

export const registerWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return await ensureDossier(result.user);
  } catch (error) {
    console.error("Registration Error", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // ensureDossier is usually called on registration, but calling here is safe
    return await ensureDossier(result.user);
  } catch (error) {
    console.error("Login Error", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

export const subscribeToAuth = (callback: (user: User | null, dossierData: any) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        callback(user, docSnap.data());
      } else {
        callback(user, null);
      }
    } else {
      callback(null, null);
    }
  });
};

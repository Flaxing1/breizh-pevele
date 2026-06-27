// lib/firestore.ts
// Helpers pour interagir avec Firestore (actualités, galerie)

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Actualite {
  id?: string;
  titre: string;
  date: string;        // "2025-09-20"
  heure: string;       // "20h00"
  lieu: string;
  description: string;
  imageUrl?: string;
  visible?: boolean;   // true = visible, false = masqué
  createdAt?: Timestamp;
}

export interface GaleriePhoto {
  id?: string;
  url: string;
  alt: string;
  createdAt?: Timestamp;
}

// ─── ACTUALITÉS ──────────────────────────────────────────────────────────────

export async function getActualites(): Promise<Actualite[]> {
  const q = query(collection(db, 'actualites'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Actualite));
}

export function subscribeActualites(callback: (items: Actualite[]) => void) {
  const q = query(collection(db, 'actualites'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Actualite));
    callback(items);
  });
}

export async function addActualite(data: Omit<Actualite, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'actualites'), {
    ...data,
    visible: data.visible !== false,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateActualite(id: string, data: Partial<Actualite>): Promise<void> {
  await updateDoc(doc(db, 'actualites', id), data);
}

export async function deleteActualite(id: string): Promise<void> {
  await deleteDoc(doc(db, 'actualites', id));
}

// ─── GALERIE ─────────────────────────────────────────────────────────────────

export function subscribeGalerie(callback: (photos: GaleriePhoto[]) => void) {
  const q = query(collection(db, 'galerie'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const photos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GaleriePhoto));
    callback(photos);
  });
}

export async function addGaleriePhoto(data: Omit<GaleriePhoto, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'galerie'), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function deleteGaleriePhoto(id: string): Promise<void> {
  await deleteDoc(doc(db, 'galerie', id));
}

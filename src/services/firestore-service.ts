import {
  doc,
  query,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  type QueryConstraint,
} from 'firebase/firestore';

import { db } from 'src/config/firebase-config';

/**
 * Generic CRUD operations for Firestore
 */

// CREATE - Add a new document
export async function addDocument(
  collectionName: string,
  docId: string,
  data: Record<string, any>
) {
  try {
    await setDoc(doc(db, collectionName, docId), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

// READ - Get a single document
export async function getDocument(collectionName: string, docId: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

// READ - Get all documents from a collection
export async function getCollection(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error);
    throw error;
  }
}

// READ - Query documents with filters
export async function queryCollection(
  collectionName: string,
  ...constraints: QueryConstraint[]
) {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error(`Error querying collection ${collectionName}:`, error);
    throw error;
  }
}

// UPDATE - Update a document
export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Record<string, any>
) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

// DELETE - Delete a document
export async function deleteDocument(collectionName: string, docId: string) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

import {
  addDoc,
  updateDoc as updateDocument,
  deleteDoc as deleteDocument,
} from 'firebase/firestore';
import { db } from '../DataBase/firebase';

export const addSong = (songData) => async (dispatch) => {
  try {
    await addDoc(collection(db, 'songs'), songData);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};




export const updateSong = (songId, updatedData) => async (dispatch) => {
  try {
    const songRef = doc(db, 'songs', songId);
    await updateDocument(songRef, updatedData);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};



export const deleteSong = (songId) => async (dispatch) => {
  try {
    const songRef = doc(db, 'songs', songId);
    await deleteDocument(songRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

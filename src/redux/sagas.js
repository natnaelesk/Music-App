import { all, call, put, takeEvery } from 'redux-saga/effects';
import { db, imgDB } from '../DataBase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  uploadSongSuccess,
  uploadSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
} from './musicSlice';



function* fetchSongsSaga() {
  try {
    const querySnapshot = yield call(getDocs, collection(db, 'Music'));
    const songs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}


function* uploadSongSaga(action) {
  const { title, artist, genre, imageFile, songFile } = action.payload;
  try {
    
    const imageRef = ref(imgDB, `images/${uuidv4()}`);
    const imageSnapshot = yield call(uploadBytes, imageRef, imageFile);
    const imageUrl = yield call(getDownloadURL, imageSnapshot.ref);

    
    const songRef = ref(imgDB, `audio/${uuidv4()}`);
    const songSnapshot = yield call(uploadBytes, songRef, songFile);
    const songUrl = yield call(getDownloadURL, songSnapshot.ref);

    
    const docRef = yield call(addDoc, collection(db, 'Music'), {
      title,
      artist,
      genre,
      imageUrl,
      audioUrl: songUrl,
    });

    yield put(uploadSongSuccess({ id: docRef.id, title, artist, genre, imageUrl, audioUrl: songUrl }));
  } catch (error) {
    yield put(uploadSongFailure(error.message));
  }
}


function* deleteSongSaga(action) {
  try {
    yield call(deleteDoc, doc(db, 'Music', action.payload));
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}


function* watchFetchSongs() {
  yield takeEvery('music/fetchSongs', fetchSongsSaga);
}

function* watchUploadSong() {
  yield takeEvery('music/uploadSong', uploadSongSaga);
}

function* watchDeleteSong() {
  yield takeEvery('music/deleteSong', deleteSongSaga);
}


export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchUploadSong(),
    watchDeleteSong(),
  ]);
}

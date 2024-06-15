import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "./components/NarBar";
import Home from "./components/Home";
import Player from "./components/Player";
import SongForm from './components/SongForm';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchSongs } from './redux/musicSlice';

function App() {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.music.uploading);
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleSelectedSongIndexChange = (index) => {
    setSelectedSongIndex(index);
  };

  return (
    <Router  basename="/Music-App">
      {uploading && (
        <div className="loading">
          <div class="container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
            </div>  
        </div>
      )}
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedSongIndex={selectedSongIndex}
                handleSelectedSongIndexChange={handleSelectedSongIndexChange}
              />
            }
          />
          <Route path="/create" element={<SongForm />} />
          <Route path="/update/:id" element={<SongForm />} />
        </Routes>
        <Player selectedSongIndex={selectedSongIndex} />
      </div>
    </Router>
  );
}

export default App;

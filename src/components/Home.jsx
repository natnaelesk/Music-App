import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, deleteSong } from '../redux/musicSlice';
import { useNavigate } from 'react-router-dom'; 
import * as Styles from './Styles/HomeStyle'; 
import menu from "../images/menu-dots-svgrepo-com.svg";

const Home = ({ handleSelectedSongIndexChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state) => state.music.songs);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [deleting, setDeleting] = useState(false); 

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleMenuClick = (index) => {
    setVisibleDropdown(visibleDropdown === index ? null : index);
  };

  const handleDelete = async (songId, index) => {
    setVisibleDropdown(visibleDropdown === index ? null : index);
    setDeleting(true); 
    try {
      await dispatch(deleteSong(songId));
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('An error occurred while deleting the song. Please try again.');
    } finally {
      setDeleting(false); 
    }
  };

  const handleUpdate = (songId) => {
    navigate(`/update/${songId}`);
  };

  return (
    <Styles.Main> 
      {deleting && (
        <Styles.LoadingOverlay> 
          <Styles.LoadingAnimation /> 
        </Styles.LoadingOverlay>
      )}
      <Styles.Banner /> 
      <Styles.Playlist>Playlist</Styles.Playlist> 
      <Styles.SongList> 
        {songs.map((song, index) => (
          <div className="songItem" key={song.id}>
            <img className="thbn" src={song.imageUrl} alt="Thumbnail" />
            <div className="content" onClick={() => handleSelectedSongIndexChange(index)}>
              <h3 className="title">{song.title}</h3>
              <p className="p">{song.artist}</p>
            </div>
            <div className="menu">
              <img
                className="menu-image"
                src={menu}
                alt="menu"
                onClick={() => handleMenuClick(index)}
              />
              <div
                className="dropdown"
                style={{
                  display: visibleDropdown === index ? 'block' : 'none',
                  maxHeight: visibleDropdown === index ? '100px' : '0'
                }}
              >
                <div className="dropdown-item" onClick={() => handleUpdate(song.id)}>Update</div>
                <div className="dropdown-item" onClick={() => handleDelete(song.id , index)}>Delete</div>
              </div>
            </div>
          </div>
        ))}
      </Styles.SongList>
    </Styles.Main>
  );
};

export default Home;

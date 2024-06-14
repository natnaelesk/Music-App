import React, { useEffect, useState } from 'react';
import {
  Form,
  InputItem,
  Label,
  InputText,
  InputFile,
  FileButton,
  Icon,
  SubmitButton,
} from './Styles/SongFormStyles';
import songIcon from '../images/music-1005-svgrepo-com.svg';
import imageIcon from '../images/image-svgrepo-com.svg';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imgDB, db } from '../DataBase/firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';

const SongForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previousImageUrl, setPreviousImageUrl] = useState('');
  const [previousSongUrl, setPreviousSongUrl] = useState('');

  useEffect(() => {
    if (id) {
      const fetchSong = async () => {
        try {
          const songDoc = await getDoc(doc(db, 'Music', id));
          if (songDoc.exists()) {
            const songData = songDoc.data();
            setTitle(songData.title);
            setArtist(songData.artist);
            setGenre(songData.genre);
            setPreviousImageUrl(songData.imageUrl);
            setPreviousSongUrl(songData.audioUrl);
          }
        } catch (error) {
          console.error('Error fetching song:', error);
        }
      };
      fetchSong();
    }
  }, [id]);

  const handleSongChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio')) {
      alert('Please select an audio file.');
      event.target.value = null; 
      return;
    }

    setSongFile(file);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) return;

    if (!file.type.startsWith('image')) {
      alert('Please select an image file.');
      event.target.value = null; 
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !genre) {
      alert('Please fill in all fields.');
      return;
    }

    setUploading(true); 

    try {
      let imageUrl = previousImageUrl;
      let songUrl = previousSongUrl;

      if (imageFile) {
        const imageRef = ref(imgDB, `images/${uuidv4()}`);
        const imageSnapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageSnapshot.ref);
      }

      if (songFile) {
        const songRef = ref(imgDB, `audio/${uuidv4()}`);
        const songSnapshot = await uploadBytes(songRef, songFile);
        songUrl = await getDownloadURL(songSnapshot.ref);
      }

      if (id) {
        await updateDoc(doc(db, 'Music', id), {
          title,
          artist,
          genre,
          imageUrl,
          audioUrl: songUrl,
        });
      } else {
        await addDoc(collection(db, 'Music'), {
          title,
          artist,
          genre,
          imageUrl,
          audioUrl: songUrl,
        });
      }

      setTitle('');
      setArtist('');
      setGenre('');
      setSongFile(null);
      setImageFile(null);

      navigate('/');

    } catch (error) {
      console.error('Error uploading files and saving data:', error);
      alert('An error occurred while uploading files and saving data. Please try again.');
    } finally {
      setUploading(false); 
    }
  };

  return (
    <div className="">
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
      <Form onSubmit={handleSubmit}>
        <InputItem>
          <Label> Title</Label>
          <InputText type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </InputItem>

        <InputItem>
          <Label>Artist</Label>
          <InputText type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </InputItem>

        <InputItem>
          <Label>Genre</Label>
          <InputText type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </InputItem>

        <InputFile>
          <input type="file" id="fileSong" onChange={handleSongChange} style={{ display: 'none' }} />
          <FileButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('fileSong').click();
            }}
          >
            <Icon src={songIcon} alt="Song Icon" />
            The Song
          </FileButton>

          <input type="file" id="fileImage" onChange={handleImageChange} style={{ display: 'none' }} />
          <FileButton
            type="button"
            className="image-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('fileImage').click();
            }}
          >
            <Icon src={imageIcon} alt="Image Icon" />
            The Image
          </FileButton>
        </InputFile>
        <SubmitButton className="btn-sub" type="submit" value="Submit" />
      </Form>
    </div>
  );
};

export default SongForm;

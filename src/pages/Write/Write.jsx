import { useState, useContext } from 'react';
import './Write.css';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Write() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: title,
      description: description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const response = await axios.post('/posts', newPost);
      window.location.replace('/post/' + response.data._id);
    } catch (err) {}
  };

  return (
    <div className='write-container'>
      {file && (
        <img src={URL.createObjectURL(file)} alt='' className='write-image' />
      )}
      <form className='write-form' onSubmit={handleSubmit}>
        <div className='write-form-group'>
          <label htmlFor='write-file-input-field'>
            <i className='write-input-file-icon fas fa-plus'></i>
          </label>
          <input
            type='file'
            id='write-file-input-field'
            className='write-file-input-field'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type='text'
            id='write-title'
            placeholder='Title'
            className='write-input write-title'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='write-form-group'>
          <textarea
            className='write-input write-text'
            type='text'
            placeholder='Tell your story'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className='write-submit' type='submit'>
          Publish
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SinglePost.css';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function SinglePost() {
  const PF = 'http://localhost:8080/images/';
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: title,
        description: description,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get('/posts/' + path);
      setPost(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    };
    getPost();
  }, [path]);
  return (
    <div className='singlepost-container'>
      <div className='singlepost-wrapper'>
        {post.photo && (
          <img src={PF + post.photo} alt='' className='singlepost-image' />
        )}
        {updateMode ? (
          <input
            type='text'
            value={title}
            className='singlepost-title-input'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlepost-title'>
            {title}
            {post.username === user?.username && (
              <div className='singlepost-edit'>
                <i
                  className='singlepost-icons fas fa-pencil-alt'
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className='singlepost-icons far fa-trash-alt'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className='singlepost-info'>
          <span className='singlepost-author'>
            Author :
            <Link className='link' to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlepost-date'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className='singlepost-description-input'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className='singlepost-description'>{description}</p>
        )}
        {updateMode && (
          <button className='singlepost-update-button' onClick={handleUpdate}>
            Update Post
          </button>
        )}
      </div>
    </div>
  );
}

import './Settings.css';
import SideBar from '../../components/SideBar/SideBar';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
export default function Settings() {
  const PF = 'http://localhost:8080/images/';
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username: username,
      email: email,
      password: password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      const response = await axios.put('/users/' + user._id, updatedUser);
      setSuccess(true);
      console.log(response);
      dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };
  return (
    <div className='settings-container'>
      <div className='settings-wrapper'>
        <div className='settings-title'>
          <span className='settings-update-title'>Update Your Account</span>
          <span className='settings-delete-title'>Delete Account</span>
        </div>
        <form className='settings-form' onSubmit={handleSubmit}>
          <label htmlFor=''>Profile Picture</label>
          <div className='settings-profile-pic'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : `${user.profilePic && PF + user.profilePic}`
              }
              alt=''
              className='settings-profile-pic-image'
            />
            <label htmlFor='settings-file-input'>
              <i className='settings-profile-pic-icon far fa-user-circle'></i>
            </label>
            <input
              type='file'
              id='settings-file-input'
              className='settings-file-input-field'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label htmlFor='settings-username'>UserName</label>
          <input
            type='text'
            name=''
            id='settings-username'
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='settings-email'>Email</label>
          <input
            type='email'
            name=''
            id='settings-email'
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='settings-password'>Password</label>
          <input
            type='password'
            name=''
            id='settings-password'
            placeholder='******'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settings-submit' type='submit'>
            Save
          </button>
          {success && (
            <div className='settings-success'>Saved Succesfully </div>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}

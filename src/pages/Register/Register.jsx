import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', {
        username: username,
        email: email,
        password: password,
      });
      response.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className='register-container'>
      <span className='register-title'>Register</span>
      <form onSubmit={handleSubmit} className='register-form'>
        <label>Name</label>
        <input
          type='texts'
          placeholder='Enter your name'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type='text'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='register-button'>Register</button>
      </form>
      <button className='register-login-button'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
      {error && <span className='error-message'>Something went wrong!</span>}
    </div>
  );
}

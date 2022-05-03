import './Login.css';

import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import axios from 'axios';

import { Context } from '../../context/Context';

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGIN_START',
    });

    try {
      const response = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passRef.current.value,
      });
      console.log(response);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAILURE',
      });
    }
  };

  return (
    <div className='login-container'>
      <span className='login-title'>Login</span>
      <form action='' className='login-form'>
        <label htmlFor=''>Username</label>
        <input type='text' placeholder='Enter your username' ref={userRef} />
        <label htmlFor=''>Password</label>
        <input
          type='password'
          placeholder='Enter your password'
          ref={passRef}
        />
        <button
          className='login-button'
          type='submit'
          onClick={handleSubmit}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
      <button className='login-register-button'>
        <Link className='link' to='/register'>
          Register
        </Link>
      </button>
    </div>
  );
}

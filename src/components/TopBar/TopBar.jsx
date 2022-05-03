import React from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
  const PF = 'http://localhost:8080/images/';
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className='topbar-container'>
      <div className='topbar-left'>
        <div className='topbar-brand'>
          <h1 className='topbar-title'>BLOGAAPE</h1>
        </div>
      </div>
      <div className='topbar-middle'>
        <ul className='topbar-navlist'>
          <li className='topbar-navlist-item'>
            <Link className='link' to='/'>
              Home
            </Link>
          </li>
          <li className='topbar-navlist-item'>
            <Link className='link' to='/'>
              About
            </Link>
          </li>
          <li className='topbar-navlist-item'>
            <Link className='link' to='/write'>
              Write
            </Link>
          </li>
          <li className='topbar-navlist-item' onClick={handleLogout}>
            {user && 'Logout'}
          </li>
        </ul>
      </div>
      <div className='topbar-right'>
        <div className='topbar-profile'>
          {user ? (
            <Link className='link' to='/settings'>
              <img
                className='topbar-avatar'
                src={user.profilePic && PF + user.profilePic}
                alt=''
              />
            </Link>
          ) : (
            <ul className='topbar-navlist'>
              <li className='topbar-navlist-item'>
                <Link className='link' to='/login'>
                  Login
                </Link>
              </li>
              <li className='topbar-navlist-item'>
                <Link className='link' to='/register'>
                  Register
                </Link>
              </li>
            </ul>
          )}
          <i className='topbar-search fas fa-search'></i>
        </div>
      </div>
    </div>
  );
}

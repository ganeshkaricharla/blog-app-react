import { useEffect, useState } from 'react';
import './SideBar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get('/categories');

      console.log(response.data);
      setCategories(response.data);
    };
    getCategories();
  }, []);
  return (
    <div className='sidebar-container'>
      <div className='sidebar-item'>
        <span className='sidebar-title'>About Me</span>
        <img
          src='https://warehouse-camo.ingress.cmh1.psfhosted.org/bc824e07e4a413f60fbf4a6793f3f9c78836c3db/68747470733a2f2f7365637572652e67726176617461722e636f6d2f6176617461722f65383434373134366235613830326430373833633531396562313432333465623f73697a653d323235'
          alt=''
          className='sidebar-image'
        />
        <p className='sidebar-abouttext'>
          I am a software engineer with a passion for learning and building. I
          am currently working at <a href='https://www.google.com/'>Google</a>
          as a software engineer.
        </p>
      </div>
      {categories && (
        <div className='sidebar-item'>
          <span className='sidebar-title'>Categories</span>
          <ul className='sidebar-list'>
            {categories &&
              categories.map((category) => (
                <li className='sidebar-list-item' key={category.name}>
                  <Link className='link' to={`/?category=${category.name}`}>
                    <b>{category.name}</b>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className='sidebar-item'>
        <span className='sidebar-title'>Follow Us</span>
        <div className='sidebar-social'>
          <p>SOCIAL</p>
        </div>
      </div>
    </div>
  );
}

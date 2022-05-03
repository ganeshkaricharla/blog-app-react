import './Home.css';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import SideBar from '../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/posts' + search);
      console.log(response.data);
      setPosts(response.data);
    };

    fetchPosts();
  }, []);
  return (
    <>
      <Header />
      <div className='home-container'>
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
}

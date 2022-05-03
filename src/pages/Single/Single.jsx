import './Single.css';
import SideBar from '../../components/SideBar/SideBar';
import SinglePost from '../../components/SinglePost/SinglePost';

export default function () {
  return (
    <>
      <div className='single-container'>
        <SinglePost />
        <SideBar />
      </div>
    </>
  );
}

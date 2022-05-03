import './Posts.css';
import Post from '../Post/Post';
export default function Posts({ posts }) {
  return (
    <div className='posts-container'>
      {posts && posts.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
}

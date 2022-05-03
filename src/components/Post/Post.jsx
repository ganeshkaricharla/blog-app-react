import './Post.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const PF = 'http://localhost:8080/images/';
  return (
    <div className='post-container'>
      {post.photo && (
        <img src={PF + post.photo} alt='' className='post-image' />
      )}
      <div className='post-info'>
        <div className='post-categories'>
          {post.categories.map((category) => (
            <span className='post-category'>{category.name}</span>
          ))}
        </div>
        <Link className='link' to={`/post/${post._id}`}>
          <span className='post-title'>{post.title}</span>
        </Link>

        <hr />
        <span className='post-date'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='post-description'>{post.description}</p>
    </div>
  );
}

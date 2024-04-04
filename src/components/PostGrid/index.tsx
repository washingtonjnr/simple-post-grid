// types
import { Post } from "../../@types/Post";
// components
import PostCard from "../PostCard";
// styles
import "./styles.scss";

interface PostsProps {
  posts: Post[];
}

const PostGrid: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="post-grid">
      {posts.map(({ id, title, body, image }) => {
        return <PostCard
          key={id}
          
          id={id} 
          title={title} 
          body={body} 
          image={image} 
        />
      })}
    </div>
  );
}

export default PostGrid;

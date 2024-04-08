// types
import { PostType } from "../../@types/Post";
// components
import PostCard from "../PostCard";
// styles
import "./styles.scss";

export type PostGridProps = {
  posts: PostType[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
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

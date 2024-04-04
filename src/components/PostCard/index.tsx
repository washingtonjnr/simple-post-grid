// types
import { PostImage } from "../../@types/Post";
// styles
import "./styles.scss";

export interface PostCardProps {
  id: number;
  title: string;
  body: string;
  image: PostImage;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, image }) => {
  return (
    <div className="post" key={id}>
      <img src={image.url} alt={`post about: ${image.title}`} />

      <h2>{title} ({ id })</h2>

      <p>{body}</p>
    </div>
  );
};

export default PostCard;

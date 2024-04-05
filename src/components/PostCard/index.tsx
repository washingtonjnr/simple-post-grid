// types
import { PostImageType } from "../../@types/Post";
// styles
import "./styles.scss";

export type PostCardProps = {
  id: number;
  title: string;
  body: string;
  image: PostImageType;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, image }) => {
  const { 
    url, 
    title: imgTitle 
  } = image

  return (
    <div className="post" key={id}>
      <img src={url} alt={`post about: ${imgTitle}`} />

      <h2>{title} ({ id })</h2>

      <p>{body}</p>
    </div>
  );
};

export default PostCard;

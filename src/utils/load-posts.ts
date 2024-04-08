import { PostType } from "../@types/Post";

const api = "https://jsonplaceholder.typicode.com";

export const loadPosts = async (): Promise<PostType[]> => {
  const responsePosts = await fetch(api + "/posts");
  const responseImages = await fetch(api + "/photos");

  if (!responsePosts.ok || !responseImages.ok)
    throw new Error("Failed to fetch");

  const postsJson = await responsePosts.json();
  const imagesJson = await responseImages.json();

  const postsAndImages = postsJson.map((post: object, index: number) => {
    return {
      ...post,
      image: imagesJson[index],
    };
  });

  return postsAndImages;
};

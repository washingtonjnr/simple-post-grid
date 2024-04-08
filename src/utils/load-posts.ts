import { PostType } from "../@types/Post";

export const apiUrl = "https://jsonplaceholder.typicode.com";

export const loadPosts = async (): Promise<PostType[]> => {
  const responsePosts = await fetch(apiUrl + "/posts");
  const responseImages = await fetch(apiUrl + "/photos");

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

export type PostImage = {
    url: string;
    title: string;
    thumbnail: string;
}

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
    image: PostImage;
}

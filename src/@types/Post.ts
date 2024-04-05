export type PostImageType = {
    url: string;
    title: string;
    thumbnail: string;
}

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
    image: PostImageType;
}

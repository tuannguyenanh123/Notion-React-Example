export type Tag = {
    color: string;
    id: string;
    name: string;
}

export type Story = {
    id: string;
    slug: string;
    cover: string;
    title: string;
    tags: Tag[];
    description: string;
    date: string
}

export type StoryPage = {
    post: BlogPost,
    markdown: string
}

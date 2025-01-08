import { getPageContent, getPageBySlug, notionClient } from "@/utils/notion";
import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";

//Plugins
import { Post } from "@/components/post";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("Slug: ", params);
  const post = await getPageBySlug(params.slug);

  //Redirect to not found page!
  if (!post) notFound();

  const content = await getPageContent(post.id);

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  const html = await notionRenderer.render(...content);

  console.log("Post: ", post);

  return (
    <Post
      title={(post.properties.Title as any).title[0].plain_text}
      content={html}
      description={html}
    />
  );
}

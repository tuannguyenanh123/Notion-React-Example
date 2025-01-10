import { NotionService } from "@/services/notion-service";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";

export async function getStaticPaths() {
  const notionService = new NotionService();
  const stories = await notionService.getPublishedStories();
  const paths = stories.map((story) => {
    return `/story/${story.slug.string}`;
  });
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const page = await notionService.getStoryBySlug(
    context?.params?.slug as string
  );
  if (!page) {
    throw "";
  }

  return {
    props: {
      page,
    },
  };
};

const Page = ({
  story,
  mdString,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>sdsdsdsdsds</Head>
      {/* <title>{post.title}</title>
                <meta name={"description"} title={"description"} content={story.description}/>
                <meta name={"og:title"} title={"og:title"} content={story.title}/>
                <meta name={"og:description"} title={"og:description"} content={story.description}/>
                <meta name={"og:image"} title={"og:image"} content={story.cover}/> */}
      <div className="min-h-screen">
        <main className="max-w-5xl mx-auto relative">
          <div className="flex items-center justify-center">
            <article className="prose">
              <ReactMarkdown>{mdString}</ReactMarkdown>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;

import { NotionService } from "@/services/notion-service";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const stories = await notionService.getPublishedStories();
  console.log("🚀 ~ constgetStaticProps:GetStaticProps= ~ stories:", stories)
  const allStories = JSON.stringify(stories)
  return {
    props: { allStories },
  };
};

export default function Home({ allStories }: InferGetStaticPropsType<typeof getStaticProps>) {
  const parsedStories = JSON.parse(allStories);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Notion Stories</h1>
        {parsedStories.map((story) => (
          <div key={story.id}>
            <h2>{story.title?.name}</h2>
            {/* <p>{story.content}</p> */}
          </div>
        ))}
      </main>
    </div>
  );
}

import { Story, StoryPage } from "@/@types/schema";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export class NotionService {
  client: Client;
  n2m: NotionToMarkdown;

  constructor() {
    this.client = new Client({
      auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
    });
    this.n2m = new NotionToMarkdown({
      notionClient: this.client,
    });
  }

  // list story
  async getPublishedStories(): Promise<Story[]> {
    const response = await this.client.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          direction: "descending",
          property: "Created",
        },
      ],
    });
    return response.results.map((res) => {
      return NotionService.pageToStoryTransformer(res);
    });
  }

  async getStoryBySlug(slug: string): Promise<StoryPage> {
    const response = await this.client.databases.query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    if (!response.results?.[0]) throw "No results available";

    const page = response.results[0];
    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    const mdString = this.n2m.toMarkdownString(mdBlocks);
    const story = NotionService.pageToStoryTransformer(page);

    return { story, mdString };
  }

  private static pageToStoryTransformer(page: any) {
    let cover = page.cover;
    console.log(cover);
    switch (cover?.type) {
      case "file":
        cover = page.cover.file;
        break;
      case "external":
        cover = page.cover.external.url;
        break;
      default:
        cover = "";
    }
    return {
      id: page.id,
      cover: cover,
      title: page.properties.Respondent?.created_by,
      tags: page.properties.Tags.select,
      description: page.properties.Description,
      date: page.properties.Updated,
      image: page.properties.Image.files,
      slug: page.properties.Slug.formula,
    };
  }
}

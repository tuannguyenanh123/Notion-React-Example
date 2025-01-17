import { MdStringObject } from "notion-to-md/build/types";

export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type Person = {
  avatar_url: string;
  id: string;
  name: string;
  object: string;
  person: { email: string };
  type: string;
};

export type Image = {
    file: {
        expiry_time: Date;
        url: string;
    }
    name: string;
    type: string;
}

export type Story = {
  id: string;
  slug: {
    type: string;
    string: string;
  };
  cover: string;
  title: Person;
  tags: Tag | Tag[];
  description: string;
  date: {
    created_time: string;
    id: string;
    type: string;
  };
  image: Image[]
};

export type StoryPage = {
  story: Story;
  mdString: MdStringObject;
};

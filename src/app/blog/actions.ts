"use server";
import fs from "fs";
import fm from "front-matter";

export interface PostAttributes extends Record<string, unknown> {
  title: string;
  readingTime: number;
  description?: string;
  tags?: string[];
  image?: string;
  date?: string;
}

export interface Post {
  preview: string;
  body: string;
  slug: string;
  fileName: string;
  publishDate: Date;
  attributes: PostAttributes;
}

function readingTime(text: string) {
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

function processPost(file: string): Post {
  const markdownRaw = fs.readFileSync(`blog_posts/${file}`, "utf8");

  const { attributes, body }: { attributes: PostAttributes; body: string } =
    fm(markdownRaw);

  const prevSplit = body.split("<!-- truncate -->");
  let preview =
    prevSplit.length > 1
      ? prevSplit[0]
      : body.split(" ").slice(0, 50).join(" ") + "...";

  if (attributes.preview) {
    preview = attributes.preview as string;
  }
  const [year, month, day] = file.replace(".md", "").split("-").slice(0, 3);

  let publishDate = new Date(`${year}-${month}-${day} 10:00`);

  if (attributes.date) {
    publishDate = new Date(attributes.date);
  }

  const slug = file.replace(".md", "").split("-").slice(3).join("-");

  if (!attributes.title) {
    attributes.title = slug
      .split("-")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  // legacy compatibility
  if (attributes.og_image) {
    attributes.image = attributes.og_image as string;
  }

  if (attributes.og_description) {
    attributes.description = attributes.og_description as string;
  }

  const filteredBody = body.replace(/<!--.*?-->/gs, ""); // remove comments

  attributes.readingTime = readingTime(filteredBody);

  return {
    fileName: file,
    preview,
    attributes,
    body: filteredBody,
    publishDate,
    slug,
  };
}

async function readPosts() {
  const files = fs.readdirSync("blog_posts");

  const posts = files.map((file) => {
    if (!file.endsWith(".md")) {
      return;
    }

    const { preview, attributes, publishDate, slug } = processPost(file);

    const published = publishDate < new Date();

    // only return published posts
    if (!published) {
      return;
    }

    return {
      fileName: file,
      preview,
      attributes,
      publishDate,
      slug,
    };
  }) as Post[];

  // order the posts by publishDate
  posts.sort((a: Post, b: Post) => {
    return a.publishDate < b.publishDate
      ? 1
      : a.publishDate > b.publishDate
      ? -1
      : 0;
  });

  // remove any undefined posts
  return posts.filter((post) => {
    return post !== undefined;
  });
}

async function readPost(slug: string) {
  const files = fs.readdirSync("blog_posts");
  const post = files.find((file) => {
    return file.includes(slug);
  });

  if (!post) {
    return null;
  }

  return processPost(post);
}

export async function listPosts(tags?: string[]) {
  const posts = await readPosts();

  // filter by tags
  if (tags) {
    return posts.filter((post) => {
      return post.attributes.tags?.some((tag) => {
        return tags.includes(tag);
      });
    });
  }

  return posts;
}

export async function getPost(slug: string) {
  return await readPost(slug);
}

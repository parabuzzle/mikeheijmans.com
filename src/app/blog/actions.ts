"use server";
import fs from "fs";
import fm from "front-matter";

export interface PostAttributes extends Record<string, unknown> {
  title: string;
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

function processPost(file: string): Post {
  const markdownRaw = fs.readFileSync(`./src/app/blog/_posts/${file}`, "utf8");

  const { attributes, body }: { attributes: PostAttributes; body: string } =
    fm(markdownRaw);

  const preview = body.split("<!-- truncate -->")[0];
  const [year, month, day] = file.replace(".mdx", "").split("-").slice(0, 3);
  let publishDate = new Date(`${year}-${month}-${day}`);

  if (attributes.date) {
    publishDate = new Date(attributes.date);
  }

  const slug = file.replace(".mdx", "").split("-").slice(3).join("-");

  if (!attributes.title) {
    attributes.title = slug
      .split("-")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const filteredBody = body.replace(/<!--.*?-->/gs, ""); // remove comments

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
  const files = fs.readdirSync("./src/app/blog/_posts");

  const posts = files.map((file) => {
    if (!file.endsWith(".mdx")) {
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

  return posts;
}

async function readPost(slug: string) {
  const files = fs.readdirSync("./src/app/blog/_posts");
  const post = files.find((file) => {
    return file.includes(slug);
  });

  if (!post) {
    return null;
  }

  console.log(post);

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

  console.log(posts);

  return posts;
}

export async function getPost(slug: string) {
  return await readPost(slug);
}

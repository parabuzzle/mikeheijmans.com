---
title: Moving from Jekyll to NextJS and How I Did It
preview: For over a decade I used Jekyll to power mikeheijmans.com and publish the occasional blog post. It turns out I'm pretty bad at consistently blogging and I always wanted my personal website to be more of a playground and showcase of things I play with in my free time. I'm a huge fan of NextJS and it seemed like a great engine for what I wanted for mikeheijmans.com. The missing piece was "jekyll-like" blogging. There are many ways to do it, this is how I did it.
tags:
  - NextJS
  - Development
---

For over a decade I used [Jekyll](https://jekyllrb.com) to power mikeheijmans.com and publish the occasional blog post. It turns out I'm pretty bad at consistently blogging and I always wanted my personal website to be more of a playground and showcase of things I play with in my free time. I'm a huge fan of [NextJS](https://nextjs.org) and it seemed like a great engine for what I wanted for mikeheijmans.com. The missing piece was "jekyll-like" blogging. There are many ways to do it, this is how I did it.

# The Problem

Jekyll is really a static site generator focused as a blogging engine. If you look at the post count for the last 11 years, you'll see that I'm not a very good blogger. What I needed was a full on web application engine that will serve blog posts, and ideally, supports [markdown](https://www.markdownguide.org/basic-syntax/) and [frontmatter](https://jekyllrb.com/docs/front-matter/) so I can just drop-in all the legacy posts from my jekyll repo. I didn't want to do anything to "migrate" my existing content.

I migrated mikeheijmans.com to a NextJS based webapp running on Vercel. I have some plans in the works that require a full on webapp with a database and such, so stay tuned for that. I now needed a way to jekyll markdown blog posts.

## The Requirements

- Support Markdown format
- Support Frontmatter metadata
- Get its content from Markdown files saved in the source repo
- Dynamic listing and loading without a database or manually edited index file

Let's break some of these down and discuss the possible solutions for each.

## Support Markdown Format

This seems pretty straight forward on the surface. There are many ways of accomplishing this. NextJS supports MDX. You can read their docs on how to set it up [here](https://nextjs.org/docs/app/building-your-application/configuring/mdx).

The immediate problem I ran into is that the MDX support is designed for driving components inside your application. What I mean by that is that you will import the markdown file and then drop it into your frontend code as a component like this:

```js
import BlogPost from "./a-blog-post.mdx";

export default function Page() {
  return (
    <>
      <BlogPost />
    </>
  );
}
```

Or you can use the mdx file as the server-side rendered page in NextJS by naming it `page.mdx` and it will render _as_ the page for the url derived from the folder name.

```
 my-project
  ├── app
  │   └── a-blog-post
  │       └── page.(mdx/md)
  |── mdx-components.(tsx/js)
  └── package.json
```

This doesn't really work for what I want.

I would say that if you were starting from scratch and not trying to support a single directory of specifically named markdown files, this may be a good solution because you can co-locate all your assets for a post inside the post's directory.

```
 my-project
  ├── app
  │   └──blog
  │       └──a-blog-post
  │           └── page.(mdx/md)
  │           └── custom.css
  │           └── image1.png
  │           └── image2.png
  │       └──another-blog-post
  │           └── page.(mdx/md)
  │           └── image.png
  |── mdx-components.(tsx/js)
  └── package.json
```

It would be a very organized way of doing things... but not the way _I_ want to do it. Plus I like a challenge...

## Support Frontmatter

If you're using the "NextJS" way, you wouldn't use frontmatter for metadata. You would export your metadata in your mdx file.

There are some plugins for frontmatter and there information in the NextJS [docs](https://nextjs.org/docs/app/building-your-application/configuring/mdx#frontmatter).

Most of these solutions don't work when dynamically loading, which we'll talk about later.

The reason I want to support frontmatter is because all of blog posts have frontmatter already! If you're porting a Jekyll site to NextJS, you'll find that frontmatter is pretty important.

## Get Content from the Filesystem

So if we aren't doing the "NextJS/MDX" app router way, we need a way to load the content from the filesystem.

One way of doing this is to mess with the transpile pipeline to generate everything statically the way everything else works with NextJS. This is a very complicated task and will likely break on version upgrades.

The other way is to use the [Remote MDX](https://nextjs.org/docs/app/building-your-application/configuring/mdx#remote-mdx) functionality.

This will allow us to read the markdown content as a a string and feed that string into a component that will handle dynamically rendering the markdown into HTML.

```ts
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Page() {
  const markdown = fs.readFileSync(
    `blog_posts/2025-03-19-nextjs-based-blog.md`,
    "utf8"
  );
  return <MDXRemote source={markdown} />;
}
```

This works when you know what file to load... so how do we know what file to load?

_It also doesn't work on Vercel without other changes we will discuss later_

## Dynamic Listing

So lastly, we need a way to handle listing what blog posts are available based on the list of markdown files.

One solution I had entertained was to have an index file:

```js
export const posts = [
  {
    slug: "nextjs-based-blog",
    title: "Moving from Jekyll to NextJS and How I Did It",
    preview: "..."
  },
  {
    ...
  }
]
```

Yea... that doesn't scale. Plus all the files have frontmatter to provide the metadata for the list page. We can do better.

I decided to use the `fs` functions in a NextJS [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations). We'll get into how this works more in the solution section coming up next.

## The Solution

### Setup MDX

I just want to say up-front, this solution is _one way_ to accomplish this and is probably not the _best_ way to accomplish this. It's born out of a desire to "not spend _too much time_ on the blog of this website"

First of all we need to setup MDX. I'm not going go deep into this because NextJS has it well [documented](https://nextjs.org/docs/app/building-your-application/configuring/mdx).

I will note here that because we will be using `RemoteMDX`, rehype plugins loading in your `next.config.mjs` file don't apply. These plugins (like syntax highlighting) must also be handled by the `RemoteMDX` handler, which I'll cover later too.

The gist is, you'll need some packages:

```terminal
yarn add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

If you are **only** going to use `RemoteMDX`, this is _all_ you need to do. Setting up your `next.config.mjs` file and adding the `mdx-components.tsx` file is only required if you plan on using markdown as react components or `page.mdx` type loading.

### Listing the Blog Posts

So I decided to put the blog posts in a top-level directory in my repo called `blog_posts`. This is just to ease some vercel specific requirements I'll explain shortly.

As I said earlier, I used a server action to handle getting the markdown info. I prefer server actions over api routes because I don't want to have a public api that lists files and their contents.

So created a file called `actions.ts` in my blog directory:

```plaintext
 my-project
  ├── blog_posts
  │   └── 2025-03-19-nextjs-based-blog.md
  ├── app
  │   └── blog
  │       └── actions.ts
  │       └── page.tsx
  │       └── layout.tsx
  └── package.json
```

I created an action to read the contents of the `blog_posts` directory and return a list of posts.

```ts title="./actions.ts"
"use server";
import fs from "fs";

async function listPosts() {
  const files = fs.readdirSync("blog_posts");

  const posts = files.map((file) => {
    if (!file.endsWith(".md")) {
      return;
    }

    // this is where we read frontmatter and create metadata
    // I'm also splitting the file name to create publish date
    // and handling legacy frontmatter keys to the new metadata structure
    // I defined that I wanted (ie: og_image => image .. etc)
    const { preview, attributes, publishDate, slug } = processPost(file);

    // only published posts
    const published = publishDate < new Date();
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
```

I then use this server action in my `page.tsx` like this:

```ts title="./page.tsx"
import { listPosts } from "./actions";
import { PostCard } from "@/components/blog/post-card";

export default async function Page() {
  const posts = await listPosts();

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  );
}
```

This does the serverside loading of all posts with their read metadata from the frontmatter.

### Frontmatter

I'm going to quickly explain how the frontmatter is processed in the server action.

I'm using the `front-matter` package:

```
yarn add front-matter
```

The `front-matter` package provides an easy way of splitting the file up into "attributes" and "body":

```ts title="./actions.ts"
import fs from "fs";
import fm from "front-matter";

function processPost(file: string): Post {
  const markdownRaw = fs.readFileSync(`blog_posts/${file}`, "utf8");

  const { attributes, body }: { attributes: PostAttributes; body: string } =
    fm(markdownRaw);
  ...
}
```

### Rendering the Blog Post

Here's the final boss, now that we can list all the files and read their metadata to display a list of blog posts, we need to render the post.

This is accomplished by another server action to get the post content from the slug and an app router route.

First lets look at the server action:

```ts title="./actions.ts"
async function getPost(slug: string) {
  const files = fs.readdirSync("blog_posts");
  const post = files.find((file) => {
    return file.includes(slug);
  });

  if (!post) {
    return null;
  }

  return processPost(post);
}
```

As you can see, we are taking a slug and finding the file that matches the slug. This is the cheap and dirty way of doing it, but it works. The keen-eyed will see a slight problem this method. It relies on file names being unique enough to prevent multiple matches which is fine for now, but longer term this could bite me (or you).

For the post page I setup the route like this:

```plaintext
 my-project
  ├── blog_posts
  │   └── 2025-03-19-nextjs-based-blog.md
  ├── app
  │   └── blog
  │       └── [slug]
  │           └── page.tsx
  └── package.json
```

In the `page.tsx` this is what we have (I've put comments inline since its the entire file):

```ts title="./page.tsx"
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPost } from "../../actions";
import { Box, Text, Title, Divider, Flex } from "@mantine/core";

// Because we are using MDXRemote, we need to wire up the syntax highlighting directly
import rehypePrettyCode from "rehype-pretty-code";

// Defines the props we are reading.. in our case, we need the 'slug' from the url
interface Props {
  params: Promise<{ slug: string }>;
}

// generate metadata for the page so social sharing looks nice
// it's worth noting that this is optional, but nice to be derived from
// post metadata
export async function generateMetadata({
  params,
}: Props): //parent: ResolvingMetadata
Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post?.attributes.title,
    description: post?.attributes.description || post?.preview,
    openGraph: {
      images: post?.attributes.image,
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  // read the slug from the url ('/blog/post/[slug])
  const { slug } = await params;

  // use the server action to get the post data from the filesystem
  const post = await getPost(slug);

  // give a 404 if there is no post at that slug
  if (!post) {
    return notFound();
  }

  // render the post data
  return (
    <Box>
      // get the title from the attributes (frontmatter)
      <Title>{post.attributes.title}</Title>
      <Flex justify="space-between">
        <Text c="dimmed">
          // publish date derived from filename
          {new Date(post.publishDate).toLocaleDateString()}
        </Text>
        <Text c="dimmed" size="sm">
          /* reading time is an additional attribute calculated in the
          processPost function */
          {post.attributes.readingTime} min read
        </Text>
      </Flex>
      <Divider color="violet" mb="md" />
      <MDXRemote
        // feed the body as the markdown source
        source={post.body}
        options={{
          // parsing Frontmatter here makes it available inside markdown directly
          parseFrontmatter: true,
          // Here we load plugins and their options
          // in this case, this is the syntax highlighting you are looking at right now
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  defaultLang: {
                    block: "plaintext",
                    inline: "plaintext",
                  },
                  theme: {
                    dark: "synthwave-84",
                    light: "material-theme-lighter",
                  },
                },
              ],
            ],
          },
        }}
      />
    </Box>
  );
}
```

And there you have it.. a working blog in NextJS that works like Jekyll.

## Vercel - The Final Boss

But wait! It works in dev but not on Vercel! You see, Vercel compiles all the various server-side rendering and actions as lambda functions. Those `blog_post` files aren't pulled in! So you will get a "file not found" error from the `fs` functions. We need to add some configuration to `next.config.mjs` to tell Vercel to include the static files when compiling the functions.

In your config file we need to add the `outputFileTracingIncludes` to the config object:

```ts title="./next.config.mjs"
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingIncludes: {
    "/blog": ["./blog_posts/**/*"],
    "/blog/post/[slug]": ["./blog_posts/**/*"],
  },
};
```

This config tells NextJS to add the static files found at the path `./blog_posts/` to the functions for `/blog` and `/blog/post/[slug]` routes.

# Conclusion

In conclusion, it was a ton of fun to figure out how to handle my old Jekyll blog posts in a NextJS application using the new-ish app router running on Vercel. There were challenges and there's so much more to explore from here, but its a great starting point. Have fun stormin' the castle.

## A note on performance

Because we're reading and loading the markdown dynamically through server actions, we are basically doing an api call to a lambda function which takes time. Then we feed the result data into `MDXRemote` which needs to generate the html during the request. This results in loading delays. I've setup the `loading.tsx` to display on the react suspense boundary, but if you did this using the "NextJS with MDX" way where you put a `page.mdx` in a folder named for the route slug... it would be compiled statically for server-side rendering and be super fast because no api calls or dynamic data needs to be handled. This is something to keep in mind. Also, because we are reading all the files to get metadata on the list page via the server action, this will get slower with more files. I don't see this being a problem in my case, but its worth considering if you are a blogging fiend. You could get clever and do pagination using the file name dates for ordering and only read a page worth of posts or just swich to the "right" way of doing this.

Anyway, I hope this helps someone understand how to bend NextJS to their will when it comes to markdown and MDX.

# Appendix

- You can view all the files in the Github repo in the "blog" directory [here](https://github.com/parabuzzle/mikeheijmans.com/tree/4d4ee18/src/app/blog)
- View the `actions.ts` source code [here](https://github.com/parabuzzle/mikeheijmans.com/blob/4d4ee18/src/app/blog/actions.ts)
- View the `post.tsx` that powers a single post [here](https://github.com/parabuzzle/mikeheijmans.com/blob/4d4ee18/src/app/blog/post/%5Bslug%5D/page.tsx)
- View the `next.config.mjs` [here](https://github.com/parabuzzle/mikeheijmans.com/blob/4d4ee18/next.config.mjs)

_note: all of these are pinned to the commit I used to write this blog post_

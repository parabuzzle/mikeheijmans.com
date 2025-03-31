---
title: Speeding Up Page Loads with Prefetch
image: https://www.mikeheijmans.com/projects/next.png
tags:
  - NextJS
  - Development
---

In the previous post, I explained how I built my "Jekyll Compatible" blog engine in NextJS. At the end of the post, I pointed out some performance concerns related to the server actions and markdown parsing within the request. I'd like to explain how I used the "Prefetch" feature in the NextJS router to help make the site feel faster.

<!-- truncate -->

First of all, if you haven't read the previous post, I suggest you go [here](/blog/post/nextjs-based-blog) and read it first. At the end of the post I wrote the following "Note on Performance":

> Because we're reading and loading the markdown dynamically through server actions, we are basically doing an api call to a lambda function which takes time. Then we feed the result data into MDXRemote which needs to generate the html during the request. This results in additional loading delays. I've setup the loading.tsx to display on the react suspense boundary...

The suspense boundary adds a nice loader indication while this happens, but you are still "waiting". In this post, I'm going to explain how to reduce this loading time quite a bit using the frontend trick of "prefetching".

# What is Prefetch?

I can still remember attending a talk at Velocity Conf in Santa Clara given by a member of the chrome browser development team talking about this new beta feature that made the new version of chrome "feel faster". It did this by starting to load the response to links into memory in the background when you hover over them for more than a few tenths of a second. When you clicked on the link, it would switch to the new memory space which is a request already in progress (or maybe even done). This decreased the perceived loading time of pages making the browser just "feel faster". The talk was full of interesting statistics and data around hover time and "click intentions". Anyway, this is "prefetch" in a nutshell. You are loading a page before the link to it is clicked. That talk was over a decade ago and was more focused on making the browser feel a bit faster than the competitors at the time.

Since then, web application developers have adopted the practice with clever techniques tailored to the various architectures and dynamic content. NextJS is no exception to this. See the NextJS system on Vercel uses lambda functions for backend workload and these have spin up time along with the rendering for server-side rendering. This is why NextJS built the prefetch directly into their [link component](https://nextjs.org/docs/app/api-reference/components/link). If you wrap your links with the `Link` component, all the fancy prefetch happens for you. This is why NextJS on Vercel can be so cheap **AND** super snappy!

```ts caption="this will prefetch when the mouse hovers over the link and clicking the link will use the in-progress request session"
import Link from "next/link";

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

# What's the Problem?

Well since it's built in, we are done here right? Why the blog post? Well in some cases you may not be able to use the `Link` component. Like in the case of the blog post summary card, I use the `onClick` of another component:

```ts caption="truncated to prevent confusion"

import { useState } from "react";
import { Paper } from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "./styles.module.css";

export function PostCard({ post, delay }: { post: Post; delay?: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Paper
      p="lg"
      radius="md"
      shadow="sm"
      mb="xl"
      className={classes.paper}
      onClick={(): void => {
        setLoading(true);
        router.push(`/blog/post/${post.slug}`);
      }}
    >
...
```

As you can see here, I'm using the `onClick` property to set a function that will cause the loader to appear and then push to the new page.

With it setup this way, we get no prefetching and therefore no performance gains. Quite frankly, its downright slow to load blog posts. I was seeing some really bad load times with first contentful paint time averaging **11 seconds!!!**

![Speed Insights without Prefetch](/img/postimgs/speed-insights-slow.png)

# How Do We Fix This?

If there's no way you can use the NextJS `Link` component, the prefetch function is provided as part of the router. So if add a `onMouseOver={() => router.prefetch(..)}` to the component you will get the prefetch performance magic provided by the `Link` component.

```js
  return (
    <Paper
      p="lg"
      radius="md"
      shadow="sm"
      mb="xl"
      className={classes.paper}
      onMouseOver={(): void => router.prefetch(`/blog/post/${post.slug}`)}
      onClick={(): void => {
        setLoading(true);
        router.push(`/blog/post/${post.slug}`);
      }}
    >
...
```

As you can see, the `onMouseOver` is prefetching the url now. That was all that was needed but a big speed up can be seen in the analytics:

![Speed Insights with Prefetch](/img/postimgs/speed-insights-prefetch.png)

That's a huge difference from a 1-line change! I hope this helps demystify manual prefetching with NextJS for you.

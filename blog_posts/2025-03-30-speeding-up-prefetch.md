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

I can still remember attending a talk at Velocity Conf in Santa Clara given by a member of the chrome browser development team talking about this new beta feature that made the new version of chrome "feel faster". It did this by starting to load the response to links into memory in the background when you hover over them for more than a few tenths of a second. When you clicked on the link, it would switch to the new memory space which is a request already in progress (or maybe even done). This decreased the perceived loading time of pages making the browser just "feel faster". The talk was full of interesting statistics and data around hover time and "click intentions". Anyway, this is "prefetch" in a nutshell. You are loading a page before the link to it is clicked. That talk was over a decade ago.

So

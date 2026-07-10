import HomePage from "@/components/sections/home";
import { listPosts } from "@/app/blog/actions";

export default async function Page() {
  const posts = (await listPosts()).slice(0, 3).map((post) => ({
    ...post,
    body: "",
  }));

  return <HomePage posts={posts} />;
}

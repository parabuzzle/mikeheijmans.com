import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPost } from "../../actions";

export default async function RemoteMdxPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  return <MDXRemote source={post.body} />;
}

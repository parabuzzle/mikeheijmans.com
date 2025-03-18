import { MDXRemote } from "next-mdx-remote/rsc";

export default async function RemoteMdxPage() {
  //const markdown = fs.readFileSync("_posts/test.mdx", "utf8");
  //console.log(markdown);
  const markdown = "# Hello \n\nThis is a test";

  return <MDXRemote source={markdown} />;
}

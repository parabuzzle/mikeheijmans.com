import { Metadata, ResolvingMetadata } from "next";
import { Box, Text, Title, Divider, Flex } from "@mantine/core";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPost } from "../../actions";
import rehypePrettyCode from "rehype-pretty-code";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const post = await getPost(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const images = post?.attributes.image || previousImages;

  return {
    title: post?.attributes.title,
    description: post?.attributes.description || post?.preview,
    openGraph: {
      images: images,
      type: "article",
    },
  };
}

export default async function RemoteMdxPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  return (
    <Box>
      <Title>{post.attributes.title}</Title>
      <Flex justify="space-between">
        <Text c="dimmed">
          {new Date(post.publishDate).toLocaleDateString()}
        </Text>
        <Text c="dimmed" size="sm">
          {post.attributes.readingTime} min read
        </Text>
      </Flex>
      <Divider color="violet" mb="md" />

      <MDXRemote
        source={post.body}
        options={{
          parseFrontmatter: true,
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

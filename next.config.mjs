import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingIncludes: {
    "/blog": ["./blog_posts/**/*"],
    "/blog/post/[slug]": ["./blog_posts/**/*"],
  },

  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    TIINGO_API_KEY: process.env.TIINGO_API_KEY,
    ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
    TIINGO_BYPASS: process.env.TIINGO_BYPASS,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          defaultLang: {
            block: "plaintext",
            inline: "plaintext",
          },
          theme: { dark: "synthwave-84", light: "material-theme-lighter" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);

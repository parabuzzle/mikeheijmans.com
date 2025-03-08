import type { Metadata } from "next";
import "@mantine/core/styles.css";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Box,
} from "@mantine/core";
import Header from "@/components/header";
import Footer from "@/components/footer";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "MikeHeijmans.com",
  description: "The personal profile of Mike Heijmans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
        <link rel="stylesheet" href="https://use.typekit.net/wcr1wgz.css" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Header />
          <Box pb={200}>{children}</Box>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}

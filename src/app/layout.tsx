import type { Metadata } from "next";
import "@mantine/core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Box,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Header from "@/components/header";
import Footer from "@/components/footer";
import theme from "@/theme";
import "@mantine/notifications/styles.css";

export const metadata: Metadata = {
  title: "Mike's Profile",
  description:
    "Discover the personal projects of Mike Heijmans, a seasoned software engineer and technical leader with two decades of experience. As the Director of Platform Technology at Tradeweb Markets LLC, Mike leads teams focused on platform engineering, Kubernetes, CI/CD, observability, and cloud strategy. Outside of work, he explores new technologies, builds creative side projects, flies planes, dives into caves, and contributes to open-source. Dive into his latest projects, blog posts, and insights on engineering, leadership, and innovation.",
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
          <Notifications />
          <Header />
          <Box
            style={{
              zIndex: 10,
              backgroundColor: "var(--mantine-color-body)",
              marginBottom: 120,
              minHeight: "100vh",
            }}
            pb={200}
          >
            {children}
          </Box>
          <Footer />
        </MantineProvider>
      </body>
      <GoogleAnalytics gaId="G-CL66NW2EJN" />
    </html>
  );
}

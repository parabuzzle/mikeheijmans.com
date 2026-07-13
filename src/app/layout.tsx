import type { Metadata } from "next";
import "@mantine/core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  Box,
  Container,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { TiingoProvider } from "@/components/tiingo";
import ReferrerHandler from "@/components/social/referrer-handler";
import theme from "@/theme";
import "./global.css";
import "@mantine/notifications/styles.css";

export const metadata: Metadata = {
  title: "Mike Heijmans | Silicon to Cloud",
  description:
    "Mike Heijmans builds intelligent hardware from silicon to cloud: CTO of Rising Orchards, 20 years of platform engineering, embedded systems, applied AI.",
  openGraph: {
    title: "Mike Heijmans | Silicon to Cloud",
    description:
      "CTO of Rising Orchards, building cloud-connected embedded hardware (IgorBox) on twenty years of platform and infrastructure engineering at scale. ESP32 firmware, PCB design, Kubernetes, and applied AI: the whole stack, from the copper up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike Heijmans | Silicon to Cloud",
    description:
      "CTO of Rising Orchards, building cloud-connected embedded hardware (IgorBox) on twenty years of platform and infrastructure engineering at scale.",
  },
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
          <SpeedInsights />
          <Analytics />
          <TiingoProvider>
            <ModalsProvider>
              <Notifications />
              <Header />
              <Box
                style={{
                  zIndex: 10,
                  backgroundColor: "var(--mantine-color-body)",
                  marginBottom: 180,
                  minHeight: "100vh",
                }}
                pb={200}
              >
                <Container>
                  <ReferrerHandler />
                </Container>
                {children}
              </Box>
              <Footer />
            </ModalsProvider>
          </TiingoProvider>
        </MantineProvider>
      </body>
      <GoogleAnalytics gaId="G-CL66NW2EJN" />
    </html>
  );
}

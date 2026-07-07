import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import ThemeProvider from "../components/theme/theme-provider";
import QuerylessAssistant from "../components/queryless/QuerylessAssistant";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";

// EITI brand font, self-hosted (same files as the SOE database site).
const metropolis = localFont({
  src: [
    { path: "../fonts/metropolis/metropolis-regular.otf", weight: "400" },
    { path: "../fonts/metropolis/metropolis-medium.otf", weight: "500" },
    { path: "../fonts/metropolis/metropolis-semibold.otf", weight: "600" },
    { path: "../fonts/metropolis/metropolis-bold.otf", weight: "700" },
    { path: "../fonts/metropolis/metropolis-extrabold.otf", weight: "800" },
  ],
  variable: "--font-metropolis",
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? '';

const handleRouteChange = (url: string) => {
  (window as any).gtag?.("config", GA_TRACKING_ID, {
    page_path: url,
  });
};


function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  const router = useRouter();

  useEffect(() => {
    if (!GA_TRACKING_ID || GA_TRACKING_ID === '') return;
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <div id="app-shell" className={cn(metropolis.variable, "font-sans")}>
      <ThemeProvider themeName={theme}>
        <DefaultSeo {...SEO} />
        <Loader />
        <Component {...pageProps} />
        <QuerylessAssistant />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;

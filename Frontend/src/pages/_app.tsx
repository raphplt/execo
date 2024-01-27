import { ArticleProvider } from "@/context/articleContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ArticleProvider>
      <Component {...pageProps} />
    </ArticleProvider>
  );
}

export default MyApp;

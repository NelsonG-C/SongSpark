import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Song Spark" key="title" />
        <meta
          property="og:description"
          content="Create new ideas for songs"
          key="description"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

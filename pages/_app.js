import "./styles.css";
import { Analytics } from "@vercel/analytics/react";
import * as amplitude from "@amplitude/analytics-browser";

amplitude.init(process.env.AMPLIFY, undefined, {
  defaultTracking: {
    sessions: true,
    pageViews: true,
    formInteractions: true,
    fileDownloads: true,
  },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default App;

import { ImageProvider } from "@/provider/ImageProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <ImageProvider>
<Component {...pageProps} />
  </ImageProvider>;
}

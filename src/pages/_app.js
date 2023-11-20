import "@/styles/globals.css";
import { ConfeccionProvider } from "@/context/ConfeccionProvider";

export default function App({ Component, pageProps }) {
    return (
        <ConfeccionProvider>
            <Component {...pageProps} />
        </ConfeccionProvider>
    );
}

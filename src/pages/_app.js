import "@/styles/globals.css";
import { ConfeccionProvider } from "@/context/ConfeccionProvider";
import { UsariosProvider } from "@/context/UsariosProvider";

export default function App({ Component, pageProps }) {
    return (
        <UsariosProvider>
            <ConfeccionProvider>
                <Component {...pageProps} />
            </ConfeccionProvider>
        </UsariosProvider>
    );
}

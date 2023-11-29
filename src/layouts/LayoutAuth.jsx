import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function LayoutAuth({ children, pagina }) {
    return (
        <>
            <Head>
                <title> {`Dayana Sport - ${pagina}`} </title>
                <meta name="description" content="Confecciones Dayana Sport" />
                <meta http-equiv="refresh" />
            </Head>
            <main className="container mx-auto mt-2 p-5 md:flex md:justify-center min-h-screen">
                <div className="md:w-2/3 lg:w-2/5">{children}</div>
            </main>
            <ToastContainer autoClose={2000} position="top-left" />
        </>
    );
}

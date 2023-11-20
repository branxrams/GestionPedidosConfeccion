import Head from "next/head";
import Pedidos from "@/components/Pedidos";
import Sidebar from "@/components/Sidebar";
import useConfeccion from "@/hooks/useConfeccion";

export default function Layout({ children, pagina }) {
    const { categoriaActual } = useConfeccion();

    return (
        <>
            <Head>
                <title> Dayana Sport - {pagina} </title>
                <meta name="description" content="Confecciones Dayana Sport" />
            </Head>
            <div className="md:flex h-full">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 h-full">
                    <Sidebar />
                </aside>
                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen">
                    <div className="p-10">
                        {categoriaActual?.nombre === "Pedidos" && <Pedidos />}
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}

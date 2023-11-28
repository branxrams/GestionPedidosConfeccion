import Layout from "@/layouts/Layout";
import useConfeccion from "@/hooks/useConfeccion";

export default function Home() {
    const { categoriaActual } = useConfeccion();
    const nombre = "Inicio";

    return (
        <Layout pagina={`${nombre}`}>
            <h1>{nombre}</h1>
            <p>index</p>

            <div>{nombre}</div>
        </Layout>
    );
}

import Layout from "@/layouts/Layout";
import useConfeccion from "@/hooks/useConfeccion";

export default function Reportes() {
    const { categoriaActual } = useConfeccion();
    const nombre = "Reportes";

    return (
        <Layout pagina={`${nombre}`}>
            <h1>index reportes</h1>
        </Layout>
    );
}

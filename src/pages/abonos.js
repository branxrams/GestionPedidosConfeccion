import Layout from "@/layouts/Layout";
import useConfeccion from "@/hooks/useConfeccion";

export default function Abonos() {
    const { categoriaActual } = useConfeccion();
    const nombre = categoriaActual?.nombre;

    return (
        <Layout pagina={`${nombre}`}>
            <h1>index Abonos</h1>
        </Layout>
    );
}

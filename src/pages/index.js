import Layout from "@/layouts/Layout";

export default function Home() {
    const nombre = "Inicio";

    return (
        <Layout pagina={`${nombre}`}>
            <h1>{nombre}</h1>
            <p>index</p>

            <div>{nombre}</div>
        </Layout>
    );
}

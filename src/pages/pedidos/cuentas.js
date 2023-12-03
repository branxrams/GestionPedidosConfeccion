import useUsuario from "@/hooks/useUsuario";
import Layout from "@/layouts/Layout";

export default function Reportes() {
    const {} = useUsuario();

    return (
        <Layout pagina={`Reportes`}>
            <h1 className="text-4xl font-black">Administrar Cuentas</h1>
            <p className="text-xl my-5">listas de cuentas</p>
        </Layout>
    );
}

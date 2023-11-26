import useSWR from "swr";
import axios from "axios";
import ListaPedidos from "@/components/ListaPedidos";
import Layout from "@/layouts/Layout";

export default function Admin() {
    const fetcher = () => axios("/api/pedidos").then((pedidos) => pedidos.data);

    const { data } = useSWR("/api/pedidos", fetcher, { refreshInterval: 100 });

    return (
        <Layout pagina={"Administración"}>
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administrar pedidos</p>

            {data && data.length ? (
                data.map((pedidos) => (
                    <ListaPedidos key={pedidos.id} pedidos={pedidos} />
                ))
            ) : (
                <p> No hay pedidos pendientes</p>
            )}
        </Layout>
    );
}

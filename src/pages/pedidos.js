import RutaPedidos from "@/components/RutaPedidos";
import Layout from "@/layouts/Layout";
import useConfeccion from "@/hooks/useConfeccion";
import LayoutPedidos from "@/layouts/LayoutPedidos";
import Prendas from "@/components/Prendas";

export default function Pedidos() {
    const { categoriaActual, prendas } = useConfeccion();
    const nombre = categoriaActual?.nombre;

    return (
        <Layout pagina={`${nombre}`}>
            <LayoutPedidos>
                <h1 className="text-4xl font-black">Prendas</h1>
                <p className="text-xl my-10">Buscar y elejir la prenda</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 relative">
                    {prendas.map((prendaColegio) => (
                        <Prendas
                            key={prendaColegio.id}
                            prendaColegio={prendaColegio}
                        />
                    ))}
                </div>
            </LayoutPedidos>
        </Layout>
    );
}

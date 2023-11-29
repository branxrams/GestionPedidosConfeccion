import useConfeccion from "@/hooks/useConfeccion";
import Layout from "@/layouts/Layout";
import LayoutPedidos from "@/layouts/LayoutPedidos";
import ResumenPedido from "@/components/ResumenPedido";

export default function Resumen() {
    const { pedido } = useConfeccion();
    return (
        <Layout pagina={"Resumen"}>
            <LayoutPedidos>
                <h1 className="text-4xl font-black">Resumen</h1>
                <p className="text-2xl my-10">Revisar pedido</p>

                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">No hay elementos</p>
                ) : (
                    pedido.map((producto) => (
                        <ResumenPedido key={producto.id} producto={producto} />
                    ))
                )}
            </LayoutPedidos>
        </Layout>
    );
}

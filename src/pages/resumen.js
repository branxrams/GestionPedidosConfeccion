import Layout from "@/layouts/Layout";

export default function Resumen() {
    return (
        <Layout pagina={"Resumen"}>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisar pedido</p>

            {/* {pedido.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos</p>
            ) : (
                pedido.map((producto) => (
                    <ResumenProductos key={producto.id} producto={producto} />
                ))
            )} */}
        </Layout>
    );
}

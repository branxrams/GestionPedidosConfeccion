import { formatearDinero, formatearFecha } from "@/helpers";

export default function ListaPedidos({ pedidos }) {
    const { id, nombre, total, fecha, pedido } = pedidos;

    return (
        <div className="border p-10 space-y-3 my-5">
            <h3 className="text-2xl font-bold">Pedido #{id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>
            <p className="text-sm font-bold">
                Fecha: {formatearFecha(parseInt(fecha))}
            </p>

            <div>
                {pedido.map((prenda) => (
                    <div
                        key={prenda.id}
                        className="border-b last-of-type:border-0 rounded-sm my-3 px-5 py-3"
                    >
                        <div>
                            <h4 className="text-2xl font-bold text-seagull-400">
                                Prenda: {prenda.prenda}
                            </h4>
                            <p className="text-lg font-bold">
                                Cantidad: {prenda.cantidad}
                            </p>
                            <p className="text-lg font-bold">
                                Anotaciones: {prenda.anotacion ?? "No"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-10">
                <p className="mt-5 font-black text text-2xl text-seagull-500 my-5">
                    Total a pagar: {formatearDinero(total)}
                </p>
                <button
                    type="button"
                    className="bg-seagull-600 hover:bg-seagull-700 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
                >
                    Cambiar estado
                </button>
            </div>
        </div>
    );
}

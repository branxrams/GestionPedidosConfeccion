import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { formatearDinero, formatearFecha } from "@/helpers";
import useConfeccion from "@/hooks/useConfeccion";

export default function ListaPedidos({ pedidos }) {
    const [expandir, setExpandir] = useState(false);
    const [altura, setAltura] = useState("0px");
    const contenedor = useRef(null);

    const toggleExpandir = () => {
        setExpandir(!expandir);
    };

    const { id, nombre, total, fecha, pedido, abono, restante, estado } =
        pedidos;
    const {
        handleChangeModalAbono,
        handleSetPedidoActual,
        handleChangeModalEstado,
        handleSetPrenda,
    } = useConfeccion();

    const router = useRouter();

    useEffect(() => {
        if (contenedor.current) {
            setAltura(
                expandir ? `${contenedor.current.scrollHeight}px` : "0px"
            );
        }
    }, [expandir]);

    return (
        <div className="border p-10 space-y-3 my-5 shadow-lg">
            <h3 className="text-2xl font-bold">Pedido #{id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>
            <p className="mt-5 font-black text text-lg text-seagull-950">
                Estado: {estado}
            </p>
            <p className="text-sm font-bold">
                Fecha: {formatearFecha(parseInt(fecha))}
            </p>

            <div
                className="cursor-pointer flex items-center"
                onClick={toggleExpandir}
            >
                <h3 className="text-lg font-black text-seagull-800">
                    {expandir ? "Ocultar Detalle" : "Mostrar Detalle"}
                </h3>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    className={`text-seagull-800 transition-transform ${
                        !expandir && "transform rotate-180"
                    }`}
                >
                    <path
                        fill="currentColor"
                        d="M11.29 8.71L6.7 13.3a.996.996 0 1 0 1.41 1.41L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0"
                    />
                </svg>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 `}
                style={{ maxHeight: altura }}
            >
                <div ref={contenedor}>
                    {pedido.map((prenda) => (
                        <div
                            key={prenda.id}
                            className="border-b last-of-type:border-0 rounded-sm my-3 px-5 py-3 space-y-8 md:grid md:grid-cols-2"
                        >
                            <div>
                                <h4 className="text-2xl font-bold text-seagull-400">
                                    Prenda: {prenda.prenda}
                                </h4>
                                <p className="text-lg font-bold">
                                    Colegio: {prenda.colegio}
                                </p>
                                <p className="text-lg font-bold">
                                    Cantidad: {prenda.cantidad}
                                </p>
                                <p className="text-lg font-bold">
                                    Anotaciones: {prenda.anotacion ?? "No"}
                                </p>
                                <p className="text-lg font-bold">
                                    Estado: {prenda.estado}
                                </p>
                            </div>
                            {router.pathname === "/pedidos/admin" && (
                                <div>
                                    <button
                                        type="button"
                                        className="bg-seagull-400 hover:bg-seagull-700 text-white mt-10 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
                                        onClick={() => {
                                            handleSetPrenda(prenda);
                                            handleSetPedidoActual(pedidos);
                                            handleChangeModalEstado();
                                        }}
                                    >
                                        Cambiar estado
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-10">
                <div className=" space-y-1 mb-5">
                    <p className="mt-5 font-black text text-2xl text-seagull-500">
                        Total a pagar: {formatearDinero(total)}
                    </p>
                    <p className="mt-5 font-black text text-lg text-seagull-800">
                        Abonado: {formatearDinero(abono)}
                    </p>
                    <p className="mt-5 font-black text text-lg text-seagull-950">
                        Restante: {formatearDinero(restante)}
                    </p>
                </div>

                {router.pathname === "/pedidos/abonos" && (
                    <button
                        type="button"
                        className="bg-seagull-600 hover:bg-seagull-700 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
                        onClick={() => {
                            handleSetPedidoActual(pedidos);
                            handleChangeModalAbono();
                        }}
                    >
                        Agregar abono
                    </button>
                )}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import useConfeccion from "@/hooks/useConfeccion";
import Image from "next/image";
import { formatearDinero } from "@/utils";

export default function ModalPrenda() {
    const { prenda, handleChangeModal, handleAgregarPedido, pedido } =
        useConfeccion();

    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);
    const [precio, setPrecio] = useState(0);
    const [talla, setTalla] = useState("");

    const changePrecio = (talla) => {
        const newPrecio = prenda.precios.find(
            (precio) => precio.talla === talla
        );

        setPrecio(newPrecio?.precio);
    };

    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === prenda.id)) {
            const prendaEdicion = pedido.find(
                (pedidoState) => pedidoState.id === prenda.id
            );
            setEdicion(true);
            setCantidad(prendaEdicion.cantidad);
            setTalla(prendaEdicion.talla);
        }
    }, [prenda, pedido]);

    useEffect(() => {
        changePrecio(talla);
    }, [talla]);

    return (
        <div className="md:flex gap-10 items-center">
            <div className="hidden md:block md:w-1/3">
                <Image
                    width={300}
                    height={300}
                    alt={"Imagen Chest"}
                    src={"/assets/img/basket.apng"}
                />
            </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleChangeModal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>

                <h1 className="text-3xl font-bold my-5">{prenda.colegio}</h1>
                <p className=" mt-5 font-black text-4xl text-seagull-300">
                    {" "}
                    {prenda.prenda}{" "}
                </p>
                <p className="font-black mt-3 text-xl text-cyan-500 ">
                    {formatearDinero(precio ? precio : 0)}
                </p>

                <div className="flex flex-col md:flex-row gap-10 my-5 items-center">
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (cantidad <= 1) return;
                                setCantidad(cantidad - 1);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                        <p className="text-xl">{cantidad}</p>
                        <button
                            type="button"
                            onClick={() => {
                                if (cantidad >= 5) return;
                                setCantidad(cantidad + 1);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-4 items-center">
                        <label className="text-xl" htmlFor="talla">
                            Talla:{" "}
                        </label>
                        <select
                            className="border rounded-md text-xl py-2 px-4"
                            id="talla"
                            value={talla}
                            onChange={(e) => setTalla(e.target.value)}
                        >
                            <option>--Selecciona--</option>
                            {prenda.precios.map((precio) => (
                                <option key={precio.talla} value={precio.talla}>
                                    {precio.talla}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="button"
                    className={`${
                        talla
                            ? "bg-seagull-600 hover:bg-seagull-400"
                            : "bg-seagull-200 cursor-not-allowed"
                    } px-5 py-2 text-white font-bold rounded-md justify-center`}
                    onClick={() => {
                        handleAgregarPedido({
                            ...prenda,
                            cantidad,
                            talla,
                            precio,
                            estado: "Pendiente",
                        });
                    }}
                    disabled={!talla}
                >
                    {edicion ? "Guardar Cambios" : "Añadir al pedido"}
                </button>
            </div>
        </div>
    );
}

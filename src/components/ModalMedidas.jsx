import { useEffect, useState } from "react";
import Image from "next/image";
import useConfeccion from "@/hooks/useConfeccion";

export default function ModalMedidas() {
    const {
        prenda,
        handleChangeModalAnotaciones,
        pedido,
        handleAgregarPedido,
    } = useConfeccion();

    const [anotacion, setAnotacion] = useState("");
    const [edicion, setEdicion] = useState(false);

    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === prenda.id)) {
            const prendaEdicion = pedido.find(
                (pedidoState) => pedidoState.id === prenda.id
            );
            setEdicion(true);
            setAnotacion(prendaEdicion.anotacion);
        }
    }, [prenda, pedido]);
    return (
        <div className="md:flex gap-10">
            <div className="hidden md:block md:w-1/3 ">
                <Image
                    className="w-28 md:w-72 lg:w-80"
                    width={300}
                    height={300}
                    alt={"Imagen Chest"}
                    src={"/assets/img/book.apng"}
                />
            </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleChangeModalAnotaciones}>
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

                <h1 className="text-3xl font-bold">{prenda.colegio}</h1>
                <p className=" font-black text-4xl text-seagull-300">
                    {" "}
                    {prenda.prenda}{" "}
                </p>
                <p className="mt-3 text-lg font-bold">Talla: {prenda.talla}</p>

                <div className="flex flex-col my-5">
                    <label className="font-bold" htmlFor="anotacion">
                        Anotaciones:{" "}
                    </label>
                    <textarea
                        className="border border-gray-300 rounded-lg px-5 py-3"
                        name="anotacion"
                        id="anotacion"
                        cols="30"
                        rows="3"
                        placeholder="Aqui medidas personalizadas u otra info relevante..."
                        value={anotacion}
                        onChange={(e) => setAnotacion(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="button"
                    className={`${
                        anotacion === ""
                            ? "bg-indigo-200 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-400"
                    } px-5 py-2  text-white font-bold rounded-md`}
                    onClick={() => {
                        handleAgregarPedido({
                            ...prenda,
                            anotacion,
                        });
                    }}
                    disabled={anotacion === ""}
                >
                    {edicion ? "Guardar Cambios" : "Añadir al pedido"}
                </button>
            </div>
        </div>
    );
}

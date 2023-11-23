import { useEffect, useState } from "react";
import useConfeccion from "@/hooks/useConfeccion";
import Image from "next/image";
import { formatearDinero } from "@/helpers";

export default function ModalPrenda() {
    const { prenda, handleChangeModal } = useConfeccion();

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
        changePrecio(talla);
    }, [talla]);

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image
                    width={300}
                    height={300}
                    alt={"Imagen Chest"}
                    src={"/assets/img/basket.gif"}
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
                <p className=" mt-5 font-black text-4xl text-blue-rgba">
                    {" "}
                    {prenda.prenda}{" "}
                </p>
                <p className="font-black mt-3 text-xl text-cyan-500 ">
                    {formatearDinero(precio ? precio : 0)}
                </p>

                <div className="flex gap-4 my-5">
                    <button type="button">cantidades</button>
                    <select
                        className="border rounded-md"
                        id="talla"
                        value={talla}
                        onChange={(e) => setTalla(e.target.value)}
                    >
                        <option>--Talla--</option>
                        {prenda.precios.map((precio) => (
                            <option key={precio.talla} value={precio.talla}>
                                {precio.talla}
                            </option>
                        ))}
                    </select>
                    <button type="button">Adicionales</button>
                </div>
                <button
                    type="button"
                    className="bg-indigo-400 hover:bg-indigo-600 px-5 py-2  text-white font-bold rounded-md"
                >
                    {edicion ? "Guardar Cambios" : "Añadir al pedido"}
                </button>
            </div>
        </div>
    );
}

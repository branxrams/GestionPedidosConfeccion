import { useEffect, useState } from "react";
import Image from "next/image";
import useConfeccion from "@/hooks/useConfeccion";

export default function ModalCambiarEstado() {
    const {
        handleChangeModalEstado,
        prenda,
        pedidoActual,
        handleActualizarPedido,
    } = useConfeccion();

    const [estado, setEstado] = useState(prenda.estado);

    useEffect(() => {
        setEstado(prenda.estado);
    }, [prenda]);

    const handleGuardarEstado = (e) => {
        e.preventDefault();

        const pedidoActualizado = {
            ...pedidoActual,
            pedido: pedidoActual.pedido.map((prendaState) =>
                prendaState.id === prenda.id
                    ? { ...prendaState, estado }
                    : prendaState
            ),
        };

        handleActualizarPedido(pedidoActualizado);
        handleChangeModalEstado();
    };

    return (
        <div className="md:flex gap-4 justify-between">
            <div className="hidden md:block md:w-3/12">
                <Image
                    className="w-28 md:w-72 lg:w-80"
                    width={100}
                    height={100}
                    alt={"Imagen Chest"}
                    src={"/assets/img/check.apng"}
                />
            </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleChangeModalEstado}>
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
                </div>{" "}
                <div className="flex flex-col gap-5 md:flex-row justify-around">
                    <div className=" space-y-1">
                        <h1 className="text-2xl font-black">{`Prenda: ${prenda.prenda}`}</h1>
                        <p className="font-bold text-lg text-seagull-700">
                            Colegio: {prenda.colegio}
                        </p>
                        <p className="font-bold text-lg text-seagull-700">
                            Talla: {prenda.talla}
                        </p>
                    </div>
                    <form
                        onSubmit={handleGuardarEstado}
                        className="flex flex-col items-center justify-center "
                    >
                        <label className="text-2xl" htmlFor="prenda">
                            Seleccione Prenda:
                        </label>
                        <select
                            className="border border-gray-400 rounded-md mt-5 text-xl py-2 px-4"
                            name="prenda"
                            id="prenda"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option>--Seleccione--</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Empacado">Empacado</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                        <input
                            type="submit"
                            value="Guardar"
                            className={`hover:bg-seagull-600 bg-seagull-400 cursor-pointer uppercase py-3 px-5 my-3 font-bold rounded-md text-white `}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

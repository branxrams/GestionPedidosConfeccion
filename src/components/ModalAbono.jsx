import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import useConfeccion from "@/hooks/useConfeccion";
import { formatearDinero } from "@/utils";

export default function ModalAbono() {
    const [cantidadAbono, setCantidadAbono] = useState();

    const { handleChangeModalAbono, pedidoActual } = useConfeccion();
    const { nombre, telefono, estado, fecha, id, total, restante, abono } =
        pedidoActual;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/api/pedidos/${id}`, {
                cantidadAbono,
            });
            handleChangeModalAbono();
            toast.success(
                `Pedido #${id} abono de ${formatearDinero(cantidadAbono)}`
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeCantidad = (e) => {
        let value = parseFloat(e.target.value);

        if (value < 0) {
            value = 0;
        }

        if (value > restante) {
            value = restante;
        }

        setCantidadAbono(value);
    };
    return (
        <div className="md:flex gap-4">
            <div className="hidden md:block md:w-1/3">
                <Image
                    className="w-28 md:w-72 lg:w-80"
                    width={300}
                    height={300}
                    alt={"Imagen Chest"}
                    src={"/assets/img/pig.apng"}
                />
            </div>
            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleChangeModalAbono}>
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
                <div className="flex flex-col gap-5 md:flex-row justify-between">
                    <div className=" space-y-3">
                        <h1 className="text-2xl font-black">{`Pedido #${id}`}</h1>
                        <div>
                            <p className="text-2xl font-bold">
                                Nombre: {nombre}
                            </p>
                            <p className="text-lg font-bold text-seagull-600">
                                Total: {formatearDinero(total)}
                            </p>
                            <p className="text-xl text-seagull-400">
                                Abono: {formatearDinero(abono)}
                            </p>
                            <p className="text-xl text-red-500">
                                {restante === 0
                                    ? "Deuda Saldada"
                                    : `Pendiente: ${formatearDinero(restante)}`}
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center justify-center "
                    >
                        <label className="text-2xl" htmlFor="abono">
                            Valor Abono:{" "}
                        </label>
                        <input
                            type="number"
                            name="abono"
                            id="abono"
                            placeholder="Valor del abono"
                            className="border border-gray-400 rounded-md py-2 px-4 text-center text-lg hide-arrows"
                            value={cantidadAbono}
                            onChange={handleChangeCantidad}
                            disabled={restante === 0}
                        />
                        <input
                            type="submit"
                            value="Abonar"
                            className={` ${
                                restante === 0
                                    ? "cursor-not-allowed bg-seagull-200"
                                    : "hover:bg-seagull-600 bg-seagull-400 cursor-pointer"
                            } uppercase  py-3 px-5 my-3 font-bold rounded-md text-white `}
                            disabled={restante === 0}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

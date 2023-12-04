import { useCallback, useEffect, useState } from "react";
import useConfeccion from "@/hooks/useConfeccion";
import Layout from "@/layouts/Layout";
import LayoutPedidos from "@/layouts/LayoutPedidos";
import Error from "@/components/Error";
import { formatearDinero } from "@/utils";
import Factura from "@/components/Factura";

export default function Total() {
    const { handleColocarPedido, handleCancelarPedido, total, pedido } =
        useConfeccion();

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [abono, setAbono] = useState(0);
    const [error, setError] = useState(false);

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0;
    }, [pedido]);

    useEffect(() => {
        comprobarPedido();
    }, [pedido, comprobarPedido]);

    const handleArmarPedido = (e) => {
        e.preventDefault();

        if ([nombre, cedula, direccion, telefono].includes("")) {
            setError(true);
            return;
        }

        const datosPedido = {
            nombre,
            cedula,
            direccion,
            telefono,
            abono: abono === "" ? 0 : parseFloat(abono),
            restante:
                abono === "" ? total : parseFloat(total) - parseFloat(abono),
            pedido,
        };

        handleColocarPedido(datosPedido);

        setNombre("");
        setCedula("");
        setTelefono("");
        setDireccion("");
        setAbono("");
    };

    const handleChangeCantidad = (e) => {
        let value = parseFloat(e.target.value);

        if (value < 0) {
            value = 0;
        }

        if (value > total) {
            value = total;
        }

        setAbono(value);
    };

    return (
        <Layout pagina={"Total y Confirmar Pedido"}>
            <LayoutPedidos>
                <h1 className="text-4xl font-black">
                    Total y Confirmar Pedido
                </h1>
                <p className="text-2xl my-10">
                    Confirmar pedido a continuación
                </p>

                <form onSubmit={handleArmarPedido}>
                    <div className="grid grid-rows-2 grid-cols-1">
                        <div className="flex flex-col justify-between items-center my-10 bg-white shadow rounded-lg p-10">
                            <div className="w-full flex flex-col items-center">
                                <h1 className="text-lg font-bold">Resumen</h1>
                                <Factura pedido={pedido} />
                            </div>
                            <div className="mt-10">
                                <label
                                    htmlFor="abono"
                                    className="block uppercase text-slate-800 font-bold text-xl"
                                >
                                    Abono inicial
                                </label>
                                <input
                                    className="bg-gray-200 text-xl mt-3 p-2 rounded-md hide-arrows text-center"
                                    id="abono"
                                    type="number"
                                    value={abono}
                                    onChange={handleChangeCantidad}
                                />
                            </div>
                        </div>
                        <div className="my-10 bg-white shadow rounded-lg p-10">
                            {error && (
                                <Error>
                                    <p>Datos del cliente son obligatorios</p>
                                </Error>
                            )}
                            <h2 className="text-3xl font-bold mb-5">
                                Datos del cliente
                            </h2>
                            <label
                                htmlFor="nombre"
                                className="block uppercase text-slate-800 font-bold text-xl"
                            >
                                Nombre
                            </label>
                            <input
                                className="bg-gray-200 w-full mt-3 p-2 rounded-md"
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <label
                                htmlFor="nombre"
                                className="block uppercase mt-6 text-slate-800 font-bold text-xl"
                            >
                                Cedula
                            </label>
                            <input
                                className="bg-gray-200 w-full mt-3 p-2 rounded-md"
                                id="cedula"
                                type="text"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                            />
                            <label
                                htmlFor="nombre"
                                className="block uppercase mt-6 text-slate-800 font-bold text-xl"
                            >
                                Telefono
                            </label>
                            <input
                                className="bg-gray-200 w-full mt-3 p-2 rounded-md"
                                id="telefono"
                                type="text"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                            <label
                                htmlFor="nombre"
                                className="block uppercase mt-6 text-slate-800 font-bold text-xl"
                            >
                                Dirección
                            </label>
                            <input
                                className="bg-gray-200 w-full  mt-3 p-2 rounded-md"
                                id="direccion"
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                        <div className="w-full px-10 gap-5 grid grid-cols-1 grid-rows-2 md:grid-cols-2">
                            <input
                                className={` ${
                                    comprobarPedido()
                                        ? "bg-seagull-200 cursor-not-allowed"
                                        : "bg-seagull-600 hover:bg-seagull-800 cursor-pointer"
                                } text-center w-full  px-5 py-2 rounded-md uppercase font-bold text-white`}
                                type="submit"
                                value="Confirmar Pedido"
                                disabled={comprobarPedido()}
                            />
                            <input
                                className={` ${
                                    comprobarPedido()
                                        ? "bg-red-200 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-800 cursor-pointer"
                                } text-center w-full px-5 py-2 rounded-md uppercase font-bold text-white`}
                                type="button"
                                value="Cancelar pedido"
                                onClick={handleCancelarPedido}
                                disabled={comprobarPedido()}
                            />
                        </div>
                    </div>
                </form>
            </LayoutPedidos>
        </Layout>
    );
}

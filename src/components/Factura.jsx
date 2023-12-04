import { useEffect, useState } from "react";
import { formatearDinero } from "@/utils";

export default function Factura({ pedido }) {
    const [cantidad, setCantidad] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalUnitario, setTotalUnitario] = useState(0);

    useEffect(() => {
        const calcularTotales = () => {
            if (pedido) {
                const totalPrendas = pedido.reduce(
                    (total, pedidoState) => total + pedidoState.cantidad,
                    0
                );
                const totalPrecioUnitario = pedido.reduce(
                    (total, pedidoState) => total + pedidoState.precio,
                    0
                );
                const totalPrecio = pedido.reduce(
                    (total, pedidoState) =>
                        total + pedidoState.cantidad * pedidoState.precio,
                    0
                );
                setTotal(totalPrecio);
                setTotalUnitario(totalPrecioUnitario);
                setCantidad(totalPrendas);
            }
        };

        calcularTotales();
    }, [pedido]);

    return (
        <div className="mt-5 relative overflow-auto shadow-md md:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Prenda
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            P.Unit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pedido &&
                        pedido.map((prenda) => (
                            <tr
                                key={prenda.id}
                                className="odd:bg-white even:bg-gray-50 border-b"
                            >
                                <td scope="row" className="px-6 py-3">
                                    {prenda.prenda}
                                </td>
                                <td scope="row" className="px-6 py-3">
                                    {prenda.cantidad}
                                </td>
                                <td scope="row" className="px-6 py-3">
                                    {formatearDinero(prenda.precio)}
                                </td>
                                <td scope="row" className="px-6 py-3">
                                    {formatearDinero(
                                        prenda.cantidad * prenda.precio
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
                <tfoot>
                    <tr className="font-semibold text-gray-900">
                        <th scope="row" class="px-6 py-3 text-base">
                            Total
                        </th>
                        <td className="px-6 py-3">{cantidad}</td>
                        <td className="px-6 py-3">
                            {formatearDinero(totalUnitario)}
                        </td>
                        <td className="px-6 py-3">{formatearDinero(total)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

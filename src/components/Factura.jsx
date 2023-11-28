import { formatearDinero } from "@/helpers";

export default function Factura({ pedido }) {
    return (
        <div className="w-full flex items-center justify-center facturaContaiter">
            <table className="w-full border-collapse">
                <thead className="">
                    <tr>
                        <th>Prenda</th>
                        <th>Cantidad</th>
                        <th>P.Unit</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {pedido.map((prenda) => (
                        <tr key={prenda.id}>
                            <td>{prenda.prenda}</td>
                            <td>{prenda.cantidad}</td>
                            <td>{formatearDinero(prenda.precio)}</td>
                            <td>
                                {formatearDinero(
                                    prenda.cantidad * prenda.precio
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

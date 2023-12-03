import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if (req.method === "POST") {
        const { id } = req.body;

        const pedidoActual = await prisma.pedidos.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!pedidoActual) {
            return res.status(404).json({ error: "Pedido no econtrado" });
        }

        const nuevoPedido = req.body.pedido;

        const pedidoActualizado = await prisma.pedidos.update({
            where: {
                id: parseInt(id),
            },
            data: {
                pedido: nuevoPedido,
            },
        });

        const estadoGeneralActualizado = pedidoActualizado.pedido.every(
            (prenda) => prenda.estado === "Entregado"
        )
            ? "Entregado"
            : pedidoActualizado.pedido.every(
                  (prenda) => prenda.estado === "Empacado"
              )
            ? "Empacado"
            : "Pendiente";

        const estadoActualizado = await prisma.pedidos.update({
            where: {
                id: parseInt(id),
            },
            data: {
                estado: estadoGeneralActualizado,
            },
        });

        res.status(200).json({ msg: `Pedido #${id} Actualizado` });
    }
}

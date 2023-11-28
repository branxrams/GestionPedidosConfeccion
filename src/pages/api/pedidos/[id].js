import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    const { id } = req.query;
    if (req.method === "POST") {
        const { id } = req.query;

        const pedidoActual = await prisma.pedidos.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!pedidoActual) {
            return res.status(404).json({ error: "Pedido no econtrado" });
        }

        const abonoActual = pedidoActual.abono;
        const restanteActual = pedidoActual.restante;
        const nuevoAbono = abonoActual + parseFloat(req.body.cantidadAbono);
        const nuevoRestante =
            restanteActual - parseFloat(req.body.cantidadAbono);

        const pedidoActualizado = await prisma.pedidos.update({
            where: {
                id: parseInt(id),
            },
            data: {
                abono: nuevoAbono,
                restante: nuevoRestante,
            },
        });

        res.status(200).json(pedidoActualizado);
    }
}

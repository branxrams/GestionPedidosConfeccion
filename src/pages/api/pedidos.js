import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if (req.method === "GET") {
        const pedidos = await prisma.pedidos.findMany();
        res.status(200).json(pedidos);
    } else if (req.method === "POST") {
        //Crear Pedidos
        const pedido = await prisma.pedidos.create({
            data: {
                nombre: req.body.datosPedido.nombre,
                cedula: req.body.datosPedido.cedula,
                direccion: req.body.datosPedido.direccion,
                telefono: req.body.datosPedido.telefono,
                fecha: req.body.fecha,
                total: req.body.total,
                abono: req.body.datosPedido.abono,
                restante: req.body.datosPedido.restante,
                pedido: req.body.datosPedido.pedido,
            },
        });

        res.status(200).json(pedido);
    }
}

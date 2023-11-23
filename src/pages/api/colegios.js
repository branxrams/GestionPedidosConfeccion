import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const colegios = await prisma.colegios.findMany({
        include: {
            Precios: {
                include: {
                    tallas: true,
                    tipoPrendas: true,
                },
            },
        },
    });

    const resultado = [];
    colegios.forEach((colegio) => {
        const datosColegio = {
            id: colegio.id, // Genera un ID único
            colegio: colegio.nombre,
            prendas: [],
        };

        const prendasMap = {};

        colegio.Precios.forEach((precio) => {
            const prendaId = precio.tipoPrendas.id;

            if (!prendasMap[prendaId]) {
                prendasMap[prendaId] = {
                    id: Math.random().toString(36).substr(2, 9),
                    colegio: colegio.nombre,
                    prenda: precio.tipoPrendas.nombre,
                    precios: [],
                };
            }

            prendasMap[prendaId].precios.push({
                talla: precio.tallas.talla,
                precio: precio.precio,
            });
        });

        datosColegio.prendas = Object.values(prendasMap);
        resultado.push(datosColegio);
    });

    return res.status(200).json(resultado);
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const colegios = await prisma.colegios.findMany({
        include: {
            precios: {
                include: {
                    tallas: true,
                    tipoprendas: true,
                },
            },
        },
    });

    const resultado = [];
    colegios.forEach((colegio) => {
        const datosColegio = {
            id: colegio.id,
            colegio: colegio.nombre,
            prendas: [],
        };

        const prendasMap = {};

        colegio.precios.forEach((precio) => {
            const prendaId = precio.tipoprendas.id;

            if (!prendasMap[prendaId]) {
                prendasMap[prendaId] = {
                    id:
                        "SKU-" +
                        colegio.nombre +
                        "-" +
                        precio.tipoprendas.nombre,
                    colegio: colegio.nombre,
                    prenda: precio.tipoprendas.nombre,
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

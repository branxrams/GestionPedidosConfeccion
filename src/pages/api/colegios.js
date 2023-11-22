import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const infoPrendas = await prisma.prenda.findMany({
        select: {
            colegio: {
                select: {
                    nombre: true,
                },
            },
            tipoPrenda: {
                select: {
                    nombre: true,
                },
            },
        },
    });

    // Agrupar por nombre de colegio y crear un conjunto único de tipos de prendas
    const groupedInfo = infoPrendas.reduce((acc, { colegio, tipoPrenda }) => {
        const key = colegio.nombre;
        if (!acc[key]) {
            acc[key] = new Set();
        }
        acc[key].add(tipoPrenda.nombre);
        return acc;
    }, {});

    // Formatear los datos en un arreglo para la respuesta
    const formattedInfo = Object.entries(groupedInfo).flatMap(
        ([colegio, tiposPrenda]) =>
            Array.from(tiposPrenda).map((prenda, index) => ({
                id: `${colegio}-${prenda}-${index}`, // Generar un ID único
                colegio,
                prenda,
            }))
    );

    return res.status(200).json(formattedInfo);
}

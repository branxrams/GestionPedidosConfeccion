import { PrismaClient } from "@prisma/client";

import { talla } from "./data/tallas";
import { colegios } from "./data/colegios";
import { tiposPrendas } from "./data/tipoPrendas";
import { categorias } from "./data/categorias";
import { precios } from "./data/precios";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
    try {
        // await prisma.tallas.createMany({
        //     data: talla,
        // });
        // await prisma.colegios.createMany({
        //     data: colegios,
        // });
        // await prisma.categoria.createMany({
        //     data: categorias,
        // });
        // await prisma.tipoPrendas.createMany({
        //     data: tiposPrendas,
        // });

        await prisma.precios.createMany({
            data: precios,
        });
    } catch (error) {
        console.log(error);
    }
};

main();

import { PrismaClient } from "@prisma/client";
import { colegios } from "./data/colegios";

import { tallas } from "./data/tallas";
import { tipoPrendas as prendas } from "./data/tipoPrendas";
import { precios } from "./data/precios";
import { categ } from "./data/categorias";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
    try {
    } catch (error) {
        console.log(error);
    }
};

main();

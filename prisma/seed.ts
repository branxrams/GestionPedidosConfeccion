import { tallasPiernas } from "./data/tallasPiernas";
import { tallasTorso } from "./data/tallasTorso";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
    try {
        await prisma.tallaPierna.createMany({
            data: tallasPiernas,
        });
        await prisma.tallaTorso.createMany({
            data: tallasTorso,
        });
        await prisma.tipoPrenda.createMany({
            data: [
                { nombre: "Uniforme diario" },
                { nombre: "uniforme Educacion Fisica" },
            ],
        });
    } catch (error) {}
};

main();

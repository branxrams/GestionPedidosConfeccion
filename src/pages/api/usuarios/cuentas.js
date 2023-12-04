import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { userToken } = req.cookies;
    if (!userToken) {
        return res.status(401).json({ msg: "No token" });
    }
    try {
        const user = verify(userToken, process.env.JWT_SECRET);
        if (!(user.rol === "Administrador")) {
            return res.status(401).json({
                msg: "No tienes los permisos necesarios para realizar esta operacion",
            });
        }
        const cuentas = await prisma.usuario.findMany();

        if (!cuentas) {
            return res.status(401).json({
                msg: "No hay cuentas disponibles",
            });
        }

        const resultado = cuentas.map(
            ({ password, token, ...cuenta }) => cuenta
        );

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Token Invalido" });
    }
}

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

        const { email } = req.query;

        const cuenta = await prisma.usuario.delete({
            where: {
                email: email,
            },
        });

        if (!cuenta) {
            return res.status(401).json({
                msg: "Cuenta no existe",
            });
        }

        console.log(cuenta);

        return res.status(200).json({
            msg: `Cuenta ha sido eliminada`,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Token Invalido" });
    }
}

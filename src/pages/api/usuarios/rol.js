import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { userToken } = req.cookies;
    if (!userToken) {
        return res.status(401).json({ msg: "No token" });
    }

    if (req.method === "POST") {
        const { email, rol } = req.body;

        try {
            const user = verify(userToken, process.env.JWT_SECRET);

            if (!user.rol.includes("Administrador")) {
                return res.status(401).json({
                    msg: "No tienes los permisos necesarios para realizar esta operacion",
                });
            }
            const cuenta = await prisma.usuario.update({
                where: {
                    email: email,
                },
                data: {
                    rol: rol,
                },
            });

            if (!cuenta) {
                return res.status(401).json({
                    msg: "Usuario no entontrado",
                });
            }
            res.status(200).json({
                msg: `Usuario ${cuenta.nombre} es ahora ${cuenta.rol}`,
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ msg: "Token Invalido" });
        }
    }
}

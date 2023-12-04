import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
    const { userToken } = req.cookies;
    if (!userToken) {
        return res.status(401).json({ msg: "No token" });
    }

    try {
        const { id } = verify(userToken, process.env.JWT_SECRET);
        const user = await prisma.usuario.findFirst({
            where: {
                id: id,
            },
        });

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({
            nombre: user.nombre,
            correo: user.email,
            rol: user.rol,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Token Invalido" });
    }
};

export default handler;

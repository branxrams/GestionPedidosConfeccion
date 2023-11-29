import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { token } = req.query;
    try {
        const usuarioConfirmar = await prisma.usuario.findFirst({
            where: {
                token: token,
            },
        });

        if (!usuarioConfirmar) {
            return res.status(404).json({ msg: "Token no valido" });
        }

        const cuentaValidada = await prisma.usuario.update({
            where: {
                email: usuarioConfirmar.email,
            },
            data: {
                confirmado: true,
                token: "",
            },
        });

        res.status(200).json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}

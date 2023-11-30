import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generarJWT } from "@/helpers";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const usuarioEncontrado = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });

        if (!usuarioEncontrado) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const validarPassword = await bcrypt.compare(
            password,
            usuarioEncontrado.password
        );

        if (validarPassword) {
            res.status(200).json({
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email,
                token: generarJWT(usuarioEncontrado.id),
            });
        } else {
            return res.status(404).json({ msg: "La Contraseña es incorrecta" });
        }
    }
}

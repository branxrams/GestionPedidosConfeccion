import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { generarJWT } from "@/utils";

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
        if (!usuarioEncontrado.confirmado) {
            return res.status(404).json({
                msg: "Su cuenta aun no ha sido confirmada, revise su correo y confirme su cuenta",
            });
        }

        const validarPassword = await bcrypt.compare(
            password,
            usuarioEncontrado.password
        );

        if (validarPassword) {
            const token = generarJWT({
                id: usuarioEncontrado.id,
                rol: usuarioEncontrado.rol,
            });
            const serialized = cookie.serialize("userToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: "/",
            });

            res.setHeader("Set-Cookie", serialized);
            res.status(200).json({
                msg: "Inicio Correcto",
            });
        } else {
            return res.status(404).json({ msg: "La Contraseña es incorrecta" });
        }
    }
}

import { PrismaClient } from "@prisma/client";
import { generarId } from "@/helpers";
import emailRegistro from "@/helpers/email";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if (req.method === "POST") {
        try {
            const { email, password, nombre, rol } = req.body.userData;
            const existeUsuario = await prisma.usuario.findUnique({
                where: {
                    email: email,
                },
            });

            if (existeUsuario) {
                return res.status(400).json({ msg: "Usuario Ya existe" });
            }

            const salt = 10;
            const passwordHashed = await bcrypt.hash(password, salt);

            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    rol: rol,
                    nombre: nombre,
                    password: passwordHashed,
                    email: email,
                    token: generarId(),
                },
            });

            emailRegistro({
                email: nuevoUsuario.email,
                nombre: nuevoUsuario.nombre,
                token: nuevoUsuario.token,
            });

            return res.status(200).json({
                msg: "Usuario registrado correctamente",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Error interno del servidor" });
        }
    }
}

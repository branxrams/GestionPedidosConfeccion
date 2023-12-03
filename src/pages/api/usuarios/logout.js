import { verify } from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
    const { userToken } = req.cookies;

    if (!userToken) {
        return res.status(401).json({ msg: "Token Invalido" });
    }

    try {
        verify(userToken, process.env.JWT_SECRET);
        const serialized = cookie.serialize("userToken", null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json({ msg: "Cerrando Sesión" });
    } catch (error) {
        res.status(401).json({ msg: "Token Invalido" });
    }
}

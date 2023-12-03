import jwt from "jsonwebtoken";

export const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const formatearFecha = (fecha) => {
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
    };
    return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

export const generarId = () => {
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha;
};

export const generarJWT = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

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
    };
    return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

export const generarId = () => {
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha;
};

export const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

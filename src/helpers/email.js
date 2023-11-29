import nodemailer from "nodemailer";

export default async function emailRegistro(userData) {
    const { email, nombre, token } = userData;
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "f45aa68e243f68",
            pass: "af7d58b9ae29ab",
        },
    });

    const info = await transport.sendMail({
        from: '"DayanaSport - Administracion de pedidos" <cuentas@dayanasport.com>',
        to: email,
        subject: "DayanaSport - Confirma tu cuenta",
        text: "Comprueba tu cuenta en dayanaSport",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en DayanaSport</p>
        <p>Tu cuenta ya casi esta lista, solo dale click en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/usuario/${token}" target="_blank">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `,
    });
}

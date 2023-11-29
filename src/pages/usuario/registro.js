import { useState } from "react";
import LayoutAuth from "@/layouts/LayoutAuth";
import Link from "next/link";
import useUsuario from "@/hooks/useUsuario";
import Alert from "@/components/Alert";

export default function registro() {
    const [rol, setRol] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");

    const { handleRegistroUsuario, alerta, handleSetAlerta } = useUsuario();

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([rol, nombre, email, password, repetirPassword].includes("")) {
            handleSetAlerta({
                msg: "Todos los camos son obligatorios",
                error: true,
            });
            return;
        }

        if (password !== repetirPassword) {
            handleSetAlerta({
                msg: "Las contraseñas no coinciden",
                error: true,
            });
            return;
        }

        if (password.length < 6) {
            handleSetAlerta({
                msg: "La contraseña debe ser de al menos 6 caracteres",
                error: true,
            });
            return;
        }

        handleSetAlerta({});

        const userData = {
            rol,
            nombre,
            email,
            password,
        };

        handleRegistroUsuario(userData);

        setRol("");
        setNombre("");
        setEmail("");
        setPassword("");
        setRepetirPassword("");
    };

    return (
        <LayoutAuth pagina={"Registrarse"}>
            <h1 className="text-slate-500 font-black text-4xl">
                Registrate y Administra los{" "}
                <span className="text-seagull-400">Pedidos</span>
            </h1>
            {alerta.msg && <Alert alert={alerta} />}
            <form
                onSubmit={handleSubmit}
                className="my-10 bg-white shadow rounded-lg p-10"
            >
                <div className="my-5">
                    <label
                        htmlFor="rol"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Rol
                    </label>
                    <select
                        className="w-full mt-3 p-3 border rounded-xl text-gray-400 bg-gray-50 text-center"
                        name="rol"
                        id="rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option>-- Selecciona Rol --</option>
                        <option value="administrador">Administrador</option>
                        <option value="empleado">Empleado</option>
                    </select>
                </div>
                <div className="my-5">
                    <label
                        htmlFor="nombre"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombres
                    </label>
                    <input
                        type="nombre"
                        name="nombre"
                        id="nombre"
                        placeholder="Correo de usuario"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Correo Electronico
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo de usuario"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Contraseña
                    </label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Repetir Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repetirPassword}
                        onChange={(e) => setRepetirPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <input
                    type="submit"
                    value="Registarme"
                    className="bg-seagull-300 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-seagull-500"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 textsl500 uppercase text-sm"
                    href={"/usuario/login"}
                >
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link
                    className="block text-center my-5 textsl500 uppercase text-sm"
                    href={"/usuario/olvidepassword"}
                >
                    Olvide mi Contraseña
                </Link>
            </nav>
        </LayoutAuth>
    );
}

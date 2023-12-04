import { useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import Alert from "./Alert";

export default function ModalNuevoUser() {
    const [rol, setRol] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");

    const {
        handleRegistroUsuario,
        alerta,
        handleSetAlerta,
        handleChangeModalNuevoUser,
    } = useUsuario();

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

        try {
            handleRegistroUsuario(userData);

            setRol("");
            setNombre("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex justify-end">
                <button
                    className="hover:text-seagull-700 transition-colors"
                    onClick={handleChangeModalNuevoUser}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>
            <div>
                <h1 className="text-slate-500 font-black text-xl">
                    Agregar nuevo usuario
                </h1>
            </div>
            {alerta.msg && <Alert alert={alerta} />}
            <form
                onSubmit={handleSubmit}
                className="my-1 bg-white shadow rounded-lg py-3 px-5 gid grid-cols-5"
            >
                <div className="my-5 flex items-center justify-between  gap-4">
                    <label
                        htmlFor="rol"
                        className="capitalize text-gray-600 block text-lg font-bold"
                    >
                        Rol
                    </label>
                    <select
                        className="w-2/3 mt-3 p-3 border rounded-xl text-gray-400 bg-gray-50 text-center"
                        name="rol"
                        id="rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option>-- Selecciona Rol --</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Empleado">Empleado</option>
                    </select>
                </div>
                <div className="my-3 flex items-center justify-between gap-4">
                    <label
                        htmlFor="nombre"
                        className="capitalize text-gray-600 block text-lg font-bold "
                    >
                        Nombres
                    </label>
                    <input
                        type="nombre"
                        name="nombre"
                        id="nombre"
                        placeholder="Correo de usuario"
                        className="w-2/3 mt-3 p-3 border rounded-xl bg-gray-50"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-3 flex items-center justify-between gap-4">
                    <label
                        htmlFor="email"
                        className=" text-gray-600 block text-lg font-bold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo de usuario"
                        className="w-2/3 mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="my-3 flex items-center justify-between gap-4">
                    <label
                        htmlFor="password"
                        className="capitalize text-gray-600 block w-1/4 text-lg font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        className="w-2/3 mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div className="my-3 flex items-center justify-between">
                    <label
                        htmlFor="password2"
                        className="capitalize text-gray-600 block text-lg font-bold"
                    >
                        confirmar
                    </label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Repetir Contraseña"
                        className="w-2/3 mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repetirPassword}
                        onChange={(e) => setRepetirPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <input
                    type="submit"
                    value="Registarme"
                    className="bg-seagull-300 w-full py-3 text-white capitalize font-bold rounded-lg cursor-pointer hover:bg-seagull-500"
                />
            </form>
        </>
    );
}

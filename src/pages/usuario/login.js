import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import LayoutAuth from "@/layouts/LayoutAuth";
import useUsuario from "@/hooks/useUsuario";
import Alert from "@/components/Alert";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { alerta, handleSetAlerta, handleSetUsuario } = useUsuario();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            handleSetAlerta({
                msg: "Todos los campos deben estar llenos",
                error: true,
            });
            return;
        }

        handleSetAlerta({});

        try {
            const { data } = await axios.post("/api/usuarios/autenticar", {
                email,
                password,
            });

            if (data) {
                handleSetUsuario(data);
                router.push("/pedidos/pedidos");
            }
        } catch (error) {
            console.log(error);
            handleSetAlerta({
                msg: error.response?.data.msg,
                error: true,
            });
        }
    };

    return (
        <LayoutAuth pagina={"Iniciar Sesión"}>
            <h1 className="text-slate-500 font-black text-4xl">
                Inicia Sesion y Administra los{" "}
                <span className="text-seagull-400">Pedidos</span>
            </h1>
            {alerta.msg && <Alert alert={alerta} />}
            <form
                onSubmit={handleSubmit}
                className="my-10 bg-white shadow rounded-lg p-10"
            >
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
                        autoComplete="current-password"
                    />
                </div>
                <input
                    type="submit"
                    value="Iniciar sesión"
                    className="bg-seagull-300 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-seagull-500"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 textsl500 uppercase text-sm"
                    href={"/usuario/registro"}
                >
                    ¿No tienes una cuenta? Regístrate
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

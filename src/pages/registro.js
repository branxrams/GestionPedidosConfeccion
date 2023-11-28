import LayoutAuth from "@/layouts/LayoutAuth";
import Link from "next/link";

export default function registro() {
    return (
        <LayoutAuth>
            <h1 className="text-slate-700 font-black text-4xl capitalize">
                Registrate y administra los{" "}
                <span className="text-seagull-400">Pedidos</span>
            </h1>
            <form className="my-10 bg-white shadow rounded-lg p-10">
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
                    href={"/login"}
                >
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link
                    className="block text-center my-5 textsl500 uppercase text-sm"
                    href={"/olvidepassword"}
                >
                    Olvide mi Contraseña
                </Link>
            </nav>
        </LayoutAuth>
    );
}

import LayoutAuth from "@/layouts/LayoutAuth";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <LayoutAuth pagina={"Bienvenido"}>
            <div className="my-10 bg-white shadow rounded-lg p-10 grid grid-rows-2 gap-10 ">
                <h1 className="text-slate-500 font-black text-4xl text-center">
                    Bienvenido a Gestion de pedidos -{" "}
                    <span className="text-seagull-400">DayanaSport</span>
                </h1>
                <button
                    className="bg-seagull-300 mb-5 w-full max-h-12 py-3 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-seagull-500"
                    onClick={() => router.push("/usuario/login")}
                >
                    Iniciar Sesión
                </button>
            </div>
        </LayoutAuth>
    );
}

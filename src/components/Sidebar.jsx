import Image from "next/image";
import Link from "next/link";
import Categoria from "./Categoria";
import useConfeccion from "@/hooks/useConfeccion";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useUsuario from "@/hooks/useUsuario";

export default function Sidebar() {
    const { categorias } = useConfeccion();
    const { usuario } = useUsuario();
    const router = useRouter();

    const logOut = async () => {
        const response = await axios("/api/usuarios/logout");
        toast.success(response.data.msg);
        setTimeout(() => {
            router.push("/");
        }, 100);
    };
    return (
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
            <Link
                href="/pedidos/pedidos"
                className="flex items-center ps-2.5 mb-5"
            >
                <Image
                    width={170}
                    height={170}
                    src={"/assets/img/logods.svg"}
                    alt="Logo Dayana Sport"
                />
            </Link>
            <ul className="space-y-2 font-medium">
                {categorias.map((categoria) =>
                    categoria.acceso.some(
                        (acceso) => acceso.permiso === usuario.rol
                    ) &&
                    (usuario.rol === "administrador" ||
                        usuario.rol === "empleado") ? (
                        <Categoria key={categoria.id} categoria={categoria} />
                    ) : null
                )}
            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
                <li>
                    <h2 className="font-bold">Usuario</h2>
                    <p className="capitalize px-3 flex flex-col">
                        <span className="text-lg">{usuario.rol}:</span>{" "}
                        {usuario.nombre}
                    </p>
                </li>
                <li>
                    <button
                        className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-seagull-300 group"
                        onClick={logOut}
                    >
                        <svg
                            className="w-8 h-8 text-gray-500 transition duration-75 group-hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="grey"
                        >
                            <path d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399c-.277.277-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26c-.602-.602-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117h-1.11Z" />
                            <path d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68H15Z" />
                        </svg>
                        <span className="ms-3 text-xl">Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
            <div className="grid items-center"></div>
        </div>
    );
}

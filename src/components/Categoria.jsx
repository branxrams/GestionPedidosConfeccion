import { useRouter } from "next/router";
import Image from "next/image";
import useConfeccion from "@/hooks/useConfeccion";
import Link from "next/link";

export default function Categoria({ categoria }) {
    const router = useRouter();
    const nombreRuta = router.pathname.toLowerCase();

    const { nombre, icono } = categoria;

    return (
        <li>
            <Link
                className={`${
                    nombreRuta === "/pedidos/" + nombre.toLowerCase()
                        ? "bg-seagull-300"
                        : ""
                } flex  w-full items-center p-2 text-gray-900 rounded-lg hover:bg-seagull-300 group`}
                href={`/pedidos/${nombre.toLowerCase()}`}
            >
                <Image
                    className="w-8 h-8 text-gray-500 transition duration-75 group-hover:text-white"
                    width={100}
                    height={100}
                    src={`/assets/img/icono_${icono}.svg`}
                    alt={`logo ${icono}`}
                />

                <span className="ms-3 text-lg">{nombre}</span>
            </Link>
        </li>
    );
}

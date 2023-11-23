import { useRouter } from "next/router";
import Image from "next/image";
import useConfeccion from "@/hooks/useConfeccion";

export default function Categoria({ categoria }) {
    const router = useRouter();
    const nombreRuta = router.pathname.toLowerCase();

    const { nombre, icono } = categoria;

    return (
        <button
            className={`${
                nombreRuta === "/" + nombre.toLowerCase() ? "bg-blue-rgba" : ""
            } flex w-full justify-start items-center gap-4 border p-5 hover:bg-blue-rgba`}
            onClick={() => router.push(`/${nombre.toLowerCase()}`)}
        >
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.png`}
                alt={`logo ${icono}`}
            />

            <div className="text-xl font-bold">{nombre}</div>
        </button>
    );
}

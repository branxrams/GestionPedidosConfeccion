import Image from "next/image";
import useConfeccion from "@/hooks/useConfeccion";

export default function Categoria({ categoria }) {
    const { nombre, icono, id } = categoria;

    const { categoriaActual, handleCategoriaActual } = useConfeccion();

    return (
        <button
            className={`${
                categoriaActual?.id === id ? "bg-blue-rgba" : ""
            } flex w-full justify-center items-center gap-4 border p-5 hover:bg-blue-rgba`}
            onClick={() => handleCategoriaActual(id)}
        >
            <Image
                width={50}
                height={50}
                src={`/assets/img/icono_${icono}.svg`}
                alt={`logo ${icono}`}
            />

            <div className="text-xl font-bold">{nombre}</div>
        </button>
    );
}

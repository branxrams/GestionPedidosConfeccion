import Image from "next/image";
import React from "react";
import Categoria from "./Categoria";
import useConfeccion from "@/hooks/useConfeccion";

export default function Sidebar() {
    const { categorias } = useConfeccion();

    return (
        <>
            <div className="flex justify-center">
                <Image
                    width={300}
                    height={100}
                    src={"/assets/img/logods.svg"}
                    alt="Logo Dayana Sport"
                />
            </div>
            <nav className="mt-10 h-full">
                {categorias.map((categoria) => (
                    <Categoria key={categoria.id} categoria={categoria} />
                ))}
            </nav>
        </>
    );
}

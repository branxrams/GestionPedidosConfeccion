import { useRouter } from "next/router";

const pasos = [
    { paso: 1, nombre: "Prendas", url: "/pedidos" },
    { paso: 2, nombre: "Resumen", url: "/resumen" },
    { paso: 3, nombre: "Datos y Total", url: "/total" },
];

export default function RutaPedidos() {
    const router = useRouter();

    const calcularProgreso = () => {
        let valor;
        switch (router.pathname) {
            case "/pedidos/pedidos":
                valor = 2;
                break;
            case "/pedidos/resumen":
                valor = 50;
                break;
            case "/pedidos/total":
                valor = 100;
                break;

            default:
                break;
        }
        return valor;
    };

    return (
        <>
            <div className="flex justify-between mb-5">
                {pasos.map((paso) => (
                    <button
                        type="button"
                        key={paso.paso}
                        className="text-2xl font-bold boton-navegacion"
                        onClick={() => {
                            router.push(`/pedidos${paso.url}`);
                        }}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>
            <div className="bg-gray-100 mb-10">
                <div
                    style={{ width: `${calcularProgreso()}%` }}
                    className="rounded-full bg-seagull-500 text-xs leading-none h-2 text-center text-white w-10"
                ></div>
            </div>
        </>
    );
}

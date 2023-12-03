import useConfeccion from "@/hooks/useConfeccion";
import { formatearDinero } from "@/utils";

export default function ResumenPedido({ producto }) {
    const {
        handleEditarPrenda,
        handleEliminarPrenda,
        handleEditarAnotaciones,
    } = useConfeccion();

    return (
        <div className="shadow-md p-5 mb-3 flex gap-10 items-center">
            <div className=" w-2/3">
                <h3 className="text-3xl font-bold">{producto.prenda}</h3>
                <p className="text-2xl ">{producto.colegio}</p>
                <p className="text-2xl "> Talla: {producto.talla}</p>
                <p className="text-xl font-bold mt-3">
                    Cantidad: {producto.cantidad}
                </p>
                <p className="text-sm font-bold mt-5">
                    Precio: {formatearDinero(producto.precio)}
                </p>
                <p className="text-xl font-bold text-gray-700 mt-1">
                    Total:{" "}
                    {formatearDinero(producto.precio * producto.cantidad)}
                </p>
            </div>
            <div className="w-1/3 grid gap-5">
                <button
                    type="button"
                    className="flex gap-2 justify-center items-center bg-seagull-300 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full"
                    onClick={() => handleEditarAnotaciones(producto.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 100 100"
                    >
                        <path
                            fill="white"
                            d="M2.063 51.733a4.127 4.127 0 0 0-1.51 5.637l18.34 31.768a4.127 4.127 0 0 0 5.638 1.51l73.406-42.38a4.127 4.127 0 0 0 1.51-5.638l-18.34-31.768a4.127 4.127 0 0 0-5.638-1.51Zm7.701 5.084l66.258-38.254l14.214 24.62l-4.775 2.757l-5.327-9.229l-3.574 2.064l5.327 9.228l-5.465 3.156l-5.328-9.229l-3.574 2.064l5.328 9.228l-5.459 3.152l-5.328-9.229l-3.574 2.064l5.328 9.228l-5.465 3.156l-7.404-12.823l-3.574 2.063l7.404 12.823l-5.466 3.156l-5.328-9.229l-3.574 2.064l5.328 9.228l-5.459 3.151l-5.327-9.228l-3.574 2.064l5.327 9.228l-5.465 3.155l-5.328-9.228l-3.574 2.064l5.328 9.228l-3.686 2.128z"
                            color="white"
                        />
                    </svg>
                    Agregar medidas
                </button>
                <button
                    type="button"
                    className="flex gap-2 justify-center bg-sky-700 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full"
                    onClick={() => handleEditarPrenda(producto.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                    Editar
                </button>
                <button
                    type="button"
                    className="flex gap-2 justify-center bg-red-700 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full"
                    onClick={() => handleEliminarPrenda(producto.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                    Eliminar
                </button>
            </div>
        </div>
    );
}

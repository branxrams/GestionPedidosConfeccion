import useConfeccion from "@/hooks/useConfeccion";

export default function Prendas({ pieza }) {
    const { colegio, prenda } = pieza;
    const { handleSetPrenda, handleChangeModal } = useConfeccion();

    return (
        <div className="border p-3">
            <div className="p-5 grid grid-cols-1 grid-rows-grid-rows place-items-center">
                {/* <h3 className="text-2xl font-bold">{colegio}</h3> */}
                <p className="mt-5 font-black text-2xl text-seagull-400">
                    {prenda}
                </p>
                <button
                    type="button"
                    className="bg-seagull-600 hover:bg-seagull-800 py-3 text-white mt-5 uppercase rounded-md w-full font-bold"
                    onClick={() => {
                        handleSetPrenda(pieza);
                        handleChangeModal();
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default function Prendas({ prendaColegio }) {
    const { colegio, prenda } = prendaColegio;

    return (
        <div className="border p-3">
            <div className="p-5">
                <h3 className="text-2xl font-bold">{colegio}</h3>
                <p className="mt-5 font-black text-4xl text-cyan-500">
                    {prenda}
                </p>
                <button
                    type="button"
                    className="bg-indigo-500 hover:bg-indigo-800 py-3 text-white mt-5 uppercase rounded-md w-full font-bold"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}

import Prendas from "./Prendas";

export default function SeccionPrendas({ prendasColegios }) {
    const { colegio, prendas, id } = prendasColegios;
    return (
        <section className="mt-5">
            <h1 className="text-4xl font-bold my-5">{colegio}</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {prendas.map((pieza) => (
                    <Prendas key={pieza.id} pieza={pieza} />
                ))}
            </div>
        </section>
    );
}

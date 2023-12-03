import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ListaPedidos from "@/components/ListaPedidos";
import Layout from "@/layouts/Layout";
import { formatearFecha } from "@/utils";

export default function Admin() {
    const fetcher = () => axios("/api/pedidos").then((pedidos) => pedidos.data);

    const { data } = useSWR("/api/pedidos", fetcher, { refreshInterval: 100 });

    const [itemResultados, setItemResultados] = useState([]);
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");

    const handleFechaDesdeChange = (e) => {
        setFechaDesde(e.target.value);
    };

    const handleFechaHastaChange = (e) => {
        setFechaHasta(e.target.value);
    };

    useEffect(() => {
        let resultados = [];
        const desde = new Date(fechaDesde + "T00:00:00").getTime();
        const hasta = new Date(fechaDesde + "T23:59:59").getTime();

        if (data) {
            if (fechaDesde !== "" && fechaHasta !== "") {
                resultados = data.filter(
                    (pedido) => pedido.fecha >= desde && pedido.fecha <= hasta
                );

                setItemResultados(resultados);
            }
        }
    }, [fechaDesde, fechaHasta, data]);

    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const result = await fetcher();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     loadData();
    // }, []);

    return (
        <Layout pagina={"Administración"}>
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administrar pedidos</p>
            <div>
                <label className="text-lg font-semibold">
                    Filtrar por fecha:
                </label>
                <form className="flex gap-4 items-center mt-3">
                    <label className="font-medium text-lg" htmlFor="fechaDesde">
                        Desde:
                    </label>
                    <input
                        type="date"
                        id="fechaDesde"
                        value={fechaDesde}
                        onChange={handleFechaDesdeChange}
                        className="px-3 py-1 rounded-md font-medium"
                    />
                    <label className="font-medium text-lg" htmlFor="fechaHasta">
                        Hasta:
                    </label>
                    <input
                        type="date"
                        id="fechaHasta"
                        value={fechaHasta}
                        onChange={handleFechaHastaChange}
                        className="px-3 py-1 rounded-md font-medium"
                    />
                </form>
            </div>
            {data && data.length ? (
                fechaDesde === "" && fechaHasta === "" ? (
                    data.map((pedidos) => (
                        <ListaPedidos key={pedidos.id} pedidos={pedidos} />
                    ))
                ) : (
                    itemResultados.map((pedidos) => (
                        <ListaPedidos key={pedidos.id} pedidos={pedidos} />
                    ))
                )
            ) : (
                <p>No hay pedidos</p>
            )}
        </Layout>
    );
}

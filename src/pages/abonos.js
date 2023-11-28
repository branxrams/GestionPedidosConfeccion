import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Layout from "@/layouts/Layout";
import ListaPedidos from "@/components/ListaPedidos";

export default function Abonos() {
    const [item, setItem] = useState("");
    const [itemCriteria, setItemCriteria] = useState("cliente");
    const [itemResultados, setItemResultados] = useState([]);

    const fetcher = () => axios("/api/pedidos").then((pedidos) => pedidos.data);
    const { data } = useSWR("/api/pedidos", fetcher, {
        refreshInterval: 100,
    });

    const nombre = "Abonos";

    const handleCriteriaChange = (e) => {
        setItemCriteria(e.target.value);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetcher();
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        let resultados = [];

        if (item !== "") {
            if (itemCriteria === "cliente") {
                resultados = data.filter((pedido) =>
                    pedido.nombre.toLowerCase().includes(item.toLowerCase())
                );
            } else if (itemCriteria === "cedula") {
                resultados = data.filter((pedido) =>
                    pedido.cedula.toLowerCase().includes(item.toLowerCase())
                );
            } else if (itemCriteria === "prenda") {
                resultados = data.filter((pedido) =>
                    pedido.pedido.some((detalle) =>
                        detalle.prenda
                            .toLowerCase()
                            .includes(item.toLowerCase())
                    )
                );
            } else if (itemCriteria === "colegio") {
                resultados = data.filter((pedido) =>
                    pedido.pedido.some((detalle) =>
                        detalle.colegio
                            .toLowerCase()
                            .includes(item.toLowerCase())
                    )
                );
            }
        }

        setItemResultados(resultados);
    }, [item, itemCriteria, data]);

    return (
        <Layout pagina={`${nombre}`}>
            <h1 className="text-4xl font-black">Abonos</h1>
            <p className="text-xl my-5">Buscar el pedido</p>
            <form className="flex flex-col py-5 px-3 shadow-md border mb-5 rounded-md">
                <label className="text-xl font-bold" htmlFor="searchAbono">
                    {" "}
                    Buscar Pedido
                </label>
                <input
                    className="bg-gray-50 border border-gray-400 py-3 px-5 mt-2 rounded-xl font-bold"
                    type="text"
                    id="searchAbono"
                    placeholder="Ingrese datos de busqueda de abono..."
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />

                <div>
                    <label className="text-lg font-semibold">Buscar por:</label>
                    <div className="flex gap-4 ">
                        <div className="space-x-1 py-2 flex items-center">
                            <label htmlFor="cliente">Nombre cliente</label>
                            <input
                                type="radio"
                                name="radioBusqueda"
                                id="cliente"
                                value="cliente"
                                checked={itemCriteria === "cliente"}
                                onChange={handleCriteriaChange}
                            />
                        </div>
                        <div className="space-x-1 py-2 flex items-center">
                            <label htmlFor="cedula">Cedula</label>
                            <input
                                type="radio"
                                name="radioBusqueda"
                                id="cedula"
                                value="cedula"
                                checked={itemCriteria === "cedula"}
                                onChange={handleCriteriaChange}
                            />
                        </div>
                        <div className="space-x-1 py-2 flex items-center">
                            <label htmlFor="prenda">Prenda</label>
                            <input
                                type="radio"
                                name="radioBusqueda"
                                id="prenda"
                                value="prenda"
                                checked={itemCriteria === "prenda"}
                                onChange={handleCriteriaChange}
                            />
                        </div>
                        <div className="space-x-1 py-2 flex items-center">
                            <label htmlFor="colegio">Colegio</label>
                            <input
                                type="radio"
                                name="radioBusqueda"
                                id="colegio"
                                value="colegio"
                                checked={itemCriteria === "colegio"}
                                onChange={handleCriteriaChange}
                            />
                        </div>
                    </div>
                </div>
            </form>

            <div>
                {data && data.length ? (
                    item === "" ? (
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
            </div>
        </Layout>
    );
}

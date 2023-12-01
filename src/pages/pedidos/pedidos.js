import { useState } from "react";
import Layout from "@/layouts/Layout";
import useConfeccion from "@/hooks/useConfeccion";
import LayoutPedidos from "@/layouts/LayoutPedidos";
import SeccionPrendas from "@/components/SeccionPrendas";

export default function Pedidos() {
    const { prendas } = useConfeccion();

    const [item, setItem] = useState("");

    const filtrarColegios = prendas.filter((colegio) =>
        colegio.colegio.toLowerCase().includes(item.toLowerCase())
    );

    return (
        <Layout pagina={`Pedidos`}>
            <LayoutPedidos>
                <h1 className="text-4xl font-black">Prendas</h1>
                <p className="text-xl my-5">Buscar y elegir la prenda</p>
                <form className="flex flex-col py-5 shadow-md border mb-5 px-3 rounded-md">
                    <label className="text-xl font-black" htmlFor="search">
                        Buscar Colegio
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-400 py-3 px-5 mt-2 rounded-xl font-bold "
                        type="text"
                        id="search"
                        placeholder="Escribe nombre de colegio..."
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                </form>
                <div className="flex flex-col">
                    {item === ""
                        ? prendas.map((prendasColegios) => (
                              <SeccionPrendas
                                  key={prendasColegios.id}
                                  prendasColegios={prendasColegios}
                              />
                          ))
                        : filtrarColegios.map((prendasColegios) => (
                              <SeccionPrendas
                                  key={prendasColegios.id}
                                  prendasColegios={prendasColegios}
                              />
                          ))}
                    {}
                </div>
            </LayoutPedidos>
        </Layout>
    );
}

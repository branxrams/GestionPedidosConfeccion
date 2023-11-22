import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ConfeccionContext = createContext();

const ConfeccionProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [prendas, setprendas] = useState([]);

    const router = useRouter();

    const obtenerCategorias = async () => {
        try {
            const { data } = await axios("/api/categorias");
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const obtenerColegios = async () => {
        try {
            const { data } = await axios("/api/colegios");
            setprendas(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoriaActual = (id) => {
        const categoria = categorias.filter((c) => c.id === id);
        setCategoriaActual(categoria[0]);
        router.push(`/${categoriaActual?.nombre.toLowerCase()}`);
    };

    useEffect(() => {
        obtenerCategorias();
        obtenerColegios();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    return (
        <ConfeccionContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleCategoriaActual,
                prendas,
            }}
        >
            {children}
        </ConfeccionContext.Provider>
    );
};

export { ConfeccionProvider };

export default ConfeccionContext;

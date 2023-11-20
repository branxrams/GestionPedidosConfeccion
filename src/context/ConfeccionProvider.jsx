import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ConfeccionContext = createContext();

const ConfeccionProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});

    const router = useRouter();

    const obtenerCategorias = async () => {
        try {
            const { data } = await axios("/api/categorias");
            setCategorias(data);
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
            }}
        >
            {children}
        </ConfeccionContext.Provider>
    );
};

export { ConfeccionProvider };

export default ConfeccionContext;

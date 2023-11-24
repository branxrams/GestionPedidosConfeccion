import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const ConfeccionContext = createContext();

const ConfeccionProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [prendas, setPrendas] = useState([]);
    const [prenda, setPrenda] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

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
            setPrendas(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoriaActual = (id) => {
        const categoria = categorias.filter((c) => c.id === id);
        setCategoriaActual(categoria[0]);
        router.push(`/${categoriaActual?.nombre.toLowerCase()}`);
    };

    const handleSetPrenda = (prenda) => {
        setPrenda(prenda);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };

    const handleAgregarPedido = ({ ...prenda }) => {
        if (pedido.some((prendaState) => prendaState.id === prenda.id)) {
            //Actualiza la cantidad
            const pedidoActualizado = pedido.map((prendaState) =>
                prendaState.id === prenda.id ? prenda : prendaState
            );
            setPedido(pedidoActualizado);
            toast.success("Cantidad Actualizada Correctamente");
        } else {
            setPedido([...pedido, prenda]);
            toast.success("Prenda agregada al pedido");
        }
        setModal(false);
    };

    const handleEditarPrenda = (id) => {
        const productoActualizar = pedido.filter(
            (producto) => producto.id === id
        );

        setPrenda(productoActualizar[0]);
        setModal(!modal);
    };

    const handleEliminarPrenda = (id) => {
        const pedidoActualizar = pedido.filter(
            (producto) => producto.id !== id
        );
        setPedido(pedidoActualizar);
        toast.error("Prenda eliminada");
    };

    const handleColocarPedido = (datosPedido) => {};

    useEffect(() => {
        obtenerCategorias();
        obtenerColegios();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    useEffect(() => {
        const nuevoTotal = pedido.reduce(
            (total, prenda) => prenda.precio * prenda.cantidad + total,
            0
        );
        setTotal(nuevoTotal);
    }, [pedido]);

    return (
        <ConfeccionContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleCategoriaActual,
                prendas,
                prenda,
                modal,
                handleSetPrenda,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarPrenda,
                handleEliminarPrenda,
                handleColocarPedido,
                total,
            }}
        >
            {children}
        </ConfeccionContext.Provider>
    );
};

export { ConfeccionProvider };

export default ConfeccionContext;

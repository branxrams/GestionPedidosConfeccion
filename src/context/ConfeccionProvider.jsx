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
    const [modalAnotaciones, setModalAnotaciones] = useState(false);
    const [modalAbono, setModalAbono] = useState(false);
    const [modalEstado, setModalEstado] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [pedidoActual, setPedidoActual] = useState([]);

    const router = useRouter();

    const obtenerCategorias = async () => {
        try {
            const { data } = await axios("/api/categorias");
            setCategorias(data);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.msg);
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
        router.push(`/pedidos/${categoriaActual?.nombre.toLowerCase()}`);
    };

    const handleSetPrenda = (prenda) => {
        setPrenda(prenda);
    };

    const handleSetPedidoActual = (pedido) => {
        setPedidoActual(pedido);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };

    const handleChangeModalAnotaciones = () => {
        setModalAnotaciones(!modalAnotaciones);
    };

    const handleChangeModalAbono = () => {
        setModalAbono(!modalAbono);
    };

    const handleChangeModalEstado = () => {
        setModalEstado(!modalEstado);
    };

    const handleAgregarPedido = ({ ...prenda }) => {
        if (pedido.some((prendaState) => prendaState.id === prenda.id)) {
            //Actualiza la cantidad
            const pedidoActualizado = pedido.map((prendaState) =>
                prendaState.id === prenda.id ? prenda : prendaState
            );
            setPedido(pedidoActualizado);
            toast.success("Pedido Actualizado Correctamente");
        } else {
            setPedido([...pedido, prenda]);
            toast.success("Prenda agregada al pedido");
        }
        setModalAnotaciones(false);
        setModal(false);
    };

    const handleEditarAnotaciones = (id) => {
        const productoActualizar = pedido.filter(
            (producto) => producto.id === id
        );

        setPrenda(productoActualizar[0]);
        setModalAnotaciones(!modalAnotaciones);
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

    const handleColocarPedido = async (datosPedido) => {
        try {
            await axios.post("/api/pedidos", {
                datosPedido,
                total,
                fecha: Date.now().toString(),
            });

            setPedido([]);
            setTotal(0);

            toast.success("Pedido Realizado Correctamente");

            setTimeout(() => {
                router.push("/pedidos/pedidos");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelarPedido = () => {
        toast.error("Pedido Eliminado Completamente");
        setPrenda({});
        setPedido([]);
        setTotal(0);

        setTimeout(() => {
            router.push("/pedidos/pedidos");
        }, 2000);
    };

    const handleActualizarPedido = async (pedido) => {
        try {
            const { data } = await axios.post(
                "/api/pedidos/actualizar",
                pedido
            );

            toast.success(data.msg);
        } catch (error) {
            console.log(error);
        }
    };

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
                modalAnotaciones,
                modalAbono,
                modalEstado,
                handleChangeModalAnotaciones,
                handleEditarAnotaciones,
                handleChangeModalAbono,
                handleChangeModalEstado,
                pedidoActual,
                handleSetPedidoActual,
                handleCancelarPedido,
                handleActualizarPedido,
            }}
        >
            {children}
        </ConfeccionContext.Provider>
    );
};

export { ConfeccionProvider };

export default ConfeccionContext;

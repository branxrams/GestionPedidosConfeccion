import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const UsuariosContext = createContext();

const UsariosProvider = ({ children }) => {
    const [alerta, setAlerta] = useState({});
    const [usuario, setUsuario] = useState({});
    const [cuentas, setCuentas] = useState([]);
    const [modalRol, setModalRol] = useState(false);
    const [modalNuevoUser, setModalNuevoUser] = useState(false);
    const [userActual, setUserActual] = useState({});

    const router = useRouter();

    const handleSetAlerta = (alerta) => {
        setAlerta(alerta);
    };

    const handleSetUsuario = (user) => {
        setUsuario(user);
    };

    const handleChangeModalRol = () => {
        setModalRol(!modalRol);
    };

    const handleChangeModalNuevoUser = () => {
        setModalNuevoUser(!modalNuevoUser);
    };

    const handleSetUserActual = (user) => {
        setUserActual(user);
    };

    const handleRegistroUsuario = async (userData) => {
        try {
            const { data } = await axios.post("/api/usuarios/usuarios", {
                userData,
            });
            toast.success(data?.msg);
            toast.info("Correo de verificacion enviado");
            setAlerta({});
            handleChangeModalNuevoUser();
        } catch (error) {
            toast.error(error.response?.data.msg);
        }
    };

    const handleActualizarRol = async ({ email, rol }) => {
        try {
            const { data } = await axios.post("/api/usuarios/rol", {
                email,
                rol,
            });
            toast.success(data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.msg);
        }
    };

    const handlePedirCuentas = async () => {
        try {
            const { data } = await axios("/api/usuarios/cuentas");
            setCuentas(data);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.msg);
        }
    };

    const handleEliminarCuenta = async (cuenta) => {
        try {
            const { data } = await axios(
                `/api/usuarios/eliminar/${cuenta.email}`
            );
            toast.success(data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.msg);
        }
    };

    const verificarUsuario = async () => {
        try {
            const { data } = await axios("/api/usuarios/perfil");
            setUsuario(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UsuariosContext.Provider
            value={{
                handleRegistroUsuario,
                alerta,
                handleSetAlerta,
                usuario,
                handleSetUsuario,
                cuentas,
                handlePedirCuentas,
                verificarUsuario,
                modalRol,
                modalNuevoUser,
                handleChangeModalRol,
                handleChangeModalNuevoUser,
                userActual,
                handleSetUserActual,
                handleActualizarRol,
                handleEliminarCuenta,
            }}
        >
            {children}
        </UsuariosContext.Provider>
    );
};

export { UsariosProvider };

export default UsuariosContext;

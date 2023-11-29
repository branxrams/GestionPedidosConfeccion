import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const UsuariosContext = createContext();

const UsariosProvider = ({ children }) => {
    const [alerta, setAlerta] = useState({});

    const router = useRouter();

    const handleSetAlerta = (alerta) => {
        setAlerta(alerta);
    };

    const handleRegistroUsuario = async (userData) => {
        try {
            const usuario = await axios.post("/api/usuarios", { userData });
            toast.success(usuario?.data.msg);
            setAlerta({});

            setTimeout(() => {
                router.push("/usuario/login");
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data.msg);
        }
    };

    return (
        <UsuariosContext.Provider
            value={{
                handleRegistroUsuario,
                alerta,
                handleSetAlerta,
            }}
        >
            {children}
        </UsuariosContext.Provider>
    );
};

export { UsariosProvider };

export default UsuariosContext;

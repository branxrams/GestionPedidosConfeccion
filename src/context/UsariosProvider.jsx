import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const UsuariosContext = createContext();

const UsariosProvider = ({ children }) => {
    const [alerta, setAlerta] = useState({});
    const [usuario, setUsuario] = useState({});

    const router = useRouter();

    const handleSetAlerta = (alerta) => {
        setAlerta(alerta);
    };

    const handleSetUsuario = (user) => {
        setUsuario(user);
    };

    const handleRegistroUsuario = async (userData) => {
        try {
            const { data } = await axios.post("/api/usuarios/usuarios", {
                userData,
            });
            toast.success(data?.msg);
            toast.info("Correo de verificacion enviado");
            setAlerta({});

            setTimeout(() => {
                router.push("/usuario/login");
            }, 4000);
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
                usuario,
                handleSetUsuario,
            }}
        >
            {children}
        </UsuariosContext.Provider>
    );
};

export { UsariosProvider };

export default UsuariosContext;

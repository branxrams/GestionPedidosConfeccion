import { useContext } from "react";
import UsuariosContext from "@/context/UsariosProvider";

const useUsuario = () => {
    return useContext(UsuariosContext);
};

export default useUsuario;

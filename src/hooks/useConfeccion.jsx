import { useContext } from "react";
import ConfeccionContext from "@/context/ConfeccionProvider";

const useConfeccion = () => {
    return useContext(ConfeccionContext);
};

export default useConfeccion;

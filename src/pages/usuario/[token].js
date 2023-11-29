import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import LayoutAuth from "@/layouts/LayoutAuth";
import useUsuario from "@/hooks/useUsuario";
import Alert from "@/components/Alert";
import { toast } from "react-toastify";

export default function ConfirmarCuenta() {
    const router = useRouter();

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    const { alerta, handleSetAlerta } = useUsuario();
    const { token } = router.query;

    useEffect(() => {
        const confirmarCuenta = async () => {
            if (token) {
                try {
                    const url = `/api/usuarios/confirmar/${token}`;
                    const { data } = await axios(url);

                    handleSetAlerta({
                        msg: data.msg,
                        error: false,
                    });
                    setCuentaConfirmada(true);
                    toast.success(alerta.msg);
                } catch (error) {
                    handleSetAlerta({
                        msg: error.response?.data.msg,
                        error: true,
                    });
                }
            }
        };

        confirmarCuenta();
    }, [token]);

    return (
        <LayoutAuth pagina={"Confirmar Cuenta"}>
            <h1 className="text-slate-500 font-black text-4xl">
                Confirma tu Cuenta y Comienza a Gestionar Los{" "}
                <span className="text-seagull-400">Pedidos</span>
            </h1>
            {alerta.msg && <Alert alert={alerta} />}
            {cuentaConfirmada && (
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    href={"/usuario/login"}
                >
                    Iniciar Sesion
                </Link>
            )}
        </LayoutAuth>
    );
}

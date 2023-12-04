import { useEffect, useState } from "react";
import useUsuario from "@/hooks/useUsuario";
import Layout from "@/layouts/Layout";
import useSWR from "swr";
import axios from "axios";

export default function Reportes() {
    const {
        handleChangeModalRol,
        handleChangeModalNuevoUser,
        handleSetUserActual,
        handleEliminarCuenta,
    } = useUsuario();

    const fetcher = () =>
        axios("/api/usuarios/cuentas")
            .then((cuentas) => cuentas.data)
            .catch((error) => console.log(error));

    const { data } = useSWR("/api/usuarios/cuentas", fetcher, {
        refreshInterval: 100,
    });

    return (
        <Layout pagina={`Cuentas`}>
            <h1 className="text-4xl font-black">Administrar Cuentas</h1>
            <p className="text-xl my-5">listas de cuentas</p>
            <button
                onClick={handleChangeModalNuevoUser}
                className="flex gap-3 text-white bg-seagull-400 hover:bg-seagull-600 font-medium px-4 py-2 rounded-md transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                >
                    <path
                        fill="currentColor"
                        d="M10.5.156c-3.017 0-5.438 2.072-5.438 6.032c0 2.586 1.03 5.22 2.594 6.843c.61 1.623-.49 2.227-.718 2.313C3.781 16.502.093 18.602.093 20.688v.78c0 2.843 5.414 3.5 10.437 3.5a45.48 45.48 0 0 0 3.281-.124a7.75 7.75 0 0 1-2.124-5.344c0-1.791.61-3.432 1.624-4.75c-.15-.352-.21-.907.063-1.75c1.555-1.625 2.563-4.236 2.563-6.813c0-3.959-2.424-6.03-5.438-6.03zm9 13.031a6.312 6.312 0 1 0 0 12.625a6.312 6.312 0 0 0 0-12.625zM18.625 16h1.75v2.594h2.594v1.812h-2.594V23h-1.75v-2.594H16v-1.812h2.625V16z"
                    />
                </svg>
                Agregar nuevo usuario
            </button>
            <div className="mt-5 relative overflow-auto shadow-md md:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                correo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                rol
                            </th>
                            <th scope="col" className="px-6 py-3">
                                confirmado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cambiar rol
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((cuenta) => (
                                <tr
                                    key={cuenta.id}
                                    className="odd:bg-white even:bg-gray-50 border-b"
                                >
                                    <td scope="row" className="px-6 py-3">
                                        {cuenta.nombre}
                                    </td>
                                    <td scope="row" className="px-6 py-3">
                                        {cuenta.email}
                                    </td>
                                    <td scope="row" className="px-6 py-3">
                                        {cuenta.rol}
                                    </td>
                                    <td scope="row" className="px-6 py-3">
                                        {cuenta.confirmado ? "Si" : "No"}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-3 flex gap-3"
                                    >
                                        <button
                                            onClick={() => {
                                                handleSetUserActual(cuenta);
                                                handleChangeModalRol();
                                            }}
                                            className="transition-colors hover:bg-seagull-600 bg-seagull-400 text-white px-3 py-1 rounded-md font-bold"
                                        >
                                            Editar Rol
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleEliminarCuenta(cuenta);
                                            }}
                                            className="transition-colors hover:bg-red-700 bg-red-500 text-white px-3 py-1 rounded-md font-bold"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

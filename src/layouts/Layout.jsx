import { useState } from "react";
import Head from "next/head";
import Modal from "react-modal";
import Sidebar from "@/components/Sidebar";
import ModalAbono from "@/components/ModalAbono";
import ModalNuevoUser from "@/components/ModalNuevoUser";
import ModalCambiarEstado from "@/components/modalCambiarEstado";
import useConfeccion from "@/hooks/useConfeccion";
import { ToastContainer } from "react-toastify";
import useUsuario from "@/hooks/useUsuario";
import ModalCambioRol from "@/components/ModalcambioRol";

import "react-toastify/dist/ReactToastify.css";

const customStyles = {
    content: {
        zIndex: "50",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
    const { modalAbono, modalEstado } = useConfeccion();
    const { modalRol, modalNuevoUser } = useUsuario();
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const title = `Dayana Sport - ${pagina}`;
    return (
        <>
            <Head>
                <title> DayanaSport </title>
                <meta name="description" content="Confecciones Dayana Sport" />
            </Head>

            <button
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-seagull-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => setToggleSidebar(!toggleSidebar)}
            >
                <svg
                    className="w-10 h-10"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 ${
                    toggleSidebar ? "transform-none" : "-translate-x-full"
                }`}
            >
                <Sidebar />
            </aside>
            <main className="mt-1 md:ml-64">
                <div className="px-5 md:py-10">{children}</div>
            </main>

            {modalAbono && (
                <Modal isOpen={modalAbono} style={customStyles}>
                    <ModalAbono />
                </Modal>
            )}
            {modalEstado && (
                <Modal isOpen={modalEstado} style={customStyles}>
                    <ModalCambiarEstado />
                </Modal>
            )}
            {modalNuevoUser && (
                <Modal isOpen={modalNuevoUser} style={customStyles}>
                    <ModalNuevoUser />
                </Modal>
            )}
            {modalRol && (
                <Modal isOpen={modalRol} style={customStyles}>
                    <ModalCambioRol />
                </Modal>
            )}
            {toggleSidebar && (
                <div
                    onClick={() => setToggleSidebar()}
                    className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
                ></div>
            )}
            <ToastContainer autoClose={2000} position="top-left" />
        </>
    );
}

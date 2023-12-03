import Head from "next/head";
import Modal from "react-modal";
import Sidebar from "@/components/Sidebar";
import ModalAbono from "@/components/ModalAbono";
import { ToastContainer } from "react-toastify";
import useConfeccion from "@/hooks/useConfeccion";
import ModalCambiarEstado from "@/components/modalCambiarEstado";
import { useState } from "react";

const customStyles = {
    content: {
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
    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <>
            <Head>
                <title> {`Dayana Sport - ${pagina}`} </title>
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
            <ToastContainer autoClose={2000} position="top-left" />
            {toggleSidebar && (
                <div
                    onClick={() => setToggleSidebar()}
                    className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
                ></div>
            )}
        </>
    );
}

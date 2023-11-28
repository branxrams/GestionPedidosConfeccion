import Head from "next/head";
import Modal from "react-modal";
import Sidebar from "@/components/Sidebar";
import ModalAbono from "@/components/ModalAbono";
import useConfeccion from "@/hooks/useConfeccion";
import { ToastContainer } from "react-toastify";

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
    const { modalAbono } = useConfeccion();

    return (
        <>
            <Head>
                <title> {`Dayana Sport - ${pagina}`} </title>
                <meta name="description" content="Confecciones Dayana Sport" />
            </Head>
            <div className="relative">
                <div className="absolute mx-auto min-h-screen w-full px-6 py-12 md:px-5 md:py-20 lg:px-5 lg:py-0">
                    <div className="lg:flex lg:justify-between lg:gap-4">
                        <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-3/12 lg:flex-col lg:justify-between lg:py-1">
                            <Sidebar />
                        </aside>
                        <main className="pt-24 lg:w-9/12 lg:py-1 ">
                            <div className="p-10">{children}</div>
                        </main>
                    </div>
                </div>
            </div>
            {modalAbono && (
                <Modal isOpen={modalAbono} style={customStyles}>
                    <ModalAbono />
                </Modal>
            )}
            <ToastContainer autoClose={2000} position="top-left" />
        </>
    );
}

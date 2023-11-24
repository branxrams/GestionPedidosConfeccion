import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import RutaPedidos from "@/components/RutaPedidos";
import useConfeccion from "@/hooks/useConfeccion";
import ModalPrenda from "@/components/ModalPrenda";

import "react-toastify/dist/ReactToastify.css";
import ModalMedidas from "@/components/ModalMedidas";

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

export default function LayoutPedidos({ children }) {
    const { modal, prenda, modalAnotaciones } = useConfeccion();

    return (
        <>
            <section>
                <RutaPedidos />
                {children}

                {modal && (
                    <Modal isOpen={modal} style={customStyles}>
                        <ModalPrenda />
                    </Modal>
                )}
                {modalAnotaciones && (
                    <Modal isOpen={modalAnotaciones} style={customStyles}>
                        <ModalMedidas />
                    </Modal>
                )}
            </section>
            <ToastContainer autoClose={2000} />
        </>
    );
}

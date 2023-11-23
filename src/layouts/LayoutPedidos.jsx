import Modal from "react-modal";
import RutaPedidos from "@/components/RutaPedidos";
import useConfeccion from "@/hooks/useConfeccion";
import ModalPrenda from "@/components/ModalPrenda";

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
    const { modal, prenda } = useConfeccion();

    return (
        <section>
            <RutaPedidos />
            {children}

            {modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <ModalPrenda key={prenda.id} />
                </Modal>
            )}
        </section>
    );
}

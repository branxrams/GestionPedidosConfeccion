import RutaPedidos from "@/components/RutaPedidos";
import React from "react";

export default function LayoutPedidos({ children }) {
    return (
        <section>
            <RutaPedidos />
            {children}
        </section>
    );
}

import React from "react";

export default function LayoutAuth({ children }) {
    return (
        <>
            <main className="container mx-auto mt-2 p-5 md:flex md:justify-center min-h-screen">
                <div className="md:w-2/3 lg:w-2/5">{children}</div>
            </main>
        </>
    );
}

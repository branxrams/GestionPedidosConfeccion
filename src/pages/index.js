import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <div>Bienvenido a Dayana Sport</div>

            <button onClick={() => router.push("/usuario/login")}>
                Iniciar Sesión
            </button>
            <button onClick={() => router.push("/usuario/registro")}>
                Registrarse
            </button>
        </div>
    );
}

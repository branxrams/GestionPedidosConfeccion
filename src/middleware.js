import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const token = request.cookies.get("userToken");

    if (request.nextUrl.pathname.includes("/pedidos")) {
        if (token?.value === undefined) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        try {
            const { payload } = await jwtVerify(
                token.value,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(
                new URL("/usuario/login", request.url)
            );
        }
    }

    if (request.nextUrl.pathname.includes("/api/usuarios/perfil")) {
        if (token?.value === undefined) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        try {
            const { payload } = await jwtVerify(
                token.value,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );

            try {
                request.headers.user = payload;
                // console.log(request.headers);
            } catch (error) {
                console.log(error);
            }

            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(
                new URL("/usuario/login", request.url)
            );
        }
    }

    if (
        request.nextUrl.pathname.includes("/usuario/login") ||
        request.nextUrl.pathname === "/"
    ) {
        try {
            const { payload } = await jwtVerify(
                token.value,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
            return NextResponse.redirect(
                new URL("/pedidos/pedidos", request.url)
            );
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(request.nextUrl.pathname);

    if (
        request.nextUrl.pathname.includes("/pedidos/admin") ||
        request.nextUrl.pathname.includes("/pedidos/cuentas")
    ) {
        if (token?.value === undefined) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        console.log("entramos");

        try {
            console.log(" Aqiooooooo");
            const { payload } = await jwtVerify(
                token.value,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
            if (payload.rol.includes("Empleado")) {
                return NextResponse.redirect(
                    new URL("/pedidos/pedidos", request.url)
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return NextResponse.next();
}

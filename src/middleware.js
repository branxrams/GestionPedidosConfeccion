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
    return NextResponse.next();
}

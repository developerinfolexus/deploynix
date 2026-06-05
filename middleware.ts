import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
    const isCandidateDashboard = req.nextUrl.pathname.startsWith("/candidate-dashboard");
    const isEmployerDashboard = req.nextUrl.pathname.startsWith("/employer-dashboard");

    if (!token) {
        // Redirect unauthenticated users
        if (isCandidateDashboard || isEmployerDashboard) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    // Verify the JWT token
    const verifiedToken = await verifyAuth(token).catch((err) => {
        console.error(err);
    });

    if (!verifiedToken) {
        // Invalid token
        if (isCandidateDashboard || isEmployerDashboard) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    const role = verifiedToken?.role;

    // Protect Dashboard Roles
    if (isCandidateDashboard && role !== "candidate") {
        return NextResponse.redirect(new URL("/employer-dashboard", req.url));
    }

    if (isEmployerDashboard && role !== "employer") {
        return NextResponse.redirect(new URL("/candidate-dashboard", req.url));
    }

    // Redirect authenticated users away from auth pages
    if (isAuthPage && role) {
        if (role === "candidate") {
            return NextResponse.redirect(new URL("/candidate-dashboard", req.url));
        }
        if (role === "employer") {
            return NextResponse.redirect(new URL("/employer-dashboard", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/candidate-dashboard/:path*", "/employer-dashboard/:path*", "/login", "/signup"],
};

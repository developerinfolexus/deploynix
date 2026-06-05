"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // A simple check on the client-side to dynamically update the UI
        const cookies = document.cookie.split(";");
        const hasToken = cookies.some((c) => c.trim().startsWith("auth_token="));
        setIsAuthenticated(hasToken);
    }, [pathname]);

    const handleLogout = async () => {
        // Remove cookie by setting expiration
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center transition-transform hover:scale-105">
                            <Image
                                src="/Deploynix-Logo.png"
                                alt="Deploynix Logo"
                                width={160}
                                height={43}
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        <Link href="/jobs" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                            Jobs
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[color:var(--color-brand-red)] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                        </Link>
                        <Link href="/companies" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                            Companies
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[color:var(--color-brand-red)] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <Link href="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                                    Log in
                                </Link>
                                <Link href="/signup" className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-[color:var(--color-brand-red)] border border-transparent rounded-full hover:bg-[color:var(--color-brand-red)]/90 hover:shadow-[0_0_20px_rgba(241,38,48,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--color-brand-red)]">
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                            >
                                Log out
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger Icon */}
                            {!mobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 absolute top-full w-full">
                    <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
                        <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-3 rounded-md text-base font-medium">
                            Jobs
                        </Link>
                        <Link href="/companies" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-3 rounded-md text-base font-medium">
                            Companies
                        </Link>

                        <div className="pt-4 mt-4 border-t border-gray-800 flex flex-col space-y-3">
                            {!isAuthenticated ? (
                                <>
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center border border-gray-700">
                                        Log in
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-[color:var(--color-brand-red)] hover:bg-[color:var(--color-brand-red)]/90 text-white px-4 py-3 rounded-md text-base font-medium transition-colors shadow-lg shadow-[color:var(--color-brand-red)]/20">
                                        Sign up
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-3 rounded-md text-base font-medium transition-colors"
                                >
                                    Log out
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

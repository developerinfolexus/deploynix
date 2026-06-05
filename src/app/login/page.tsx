"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            if (data.user.role === "candidate") {
                router.push("/candidate-dashboard");
            } else {
                router.push("/employer-dashboard");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center relative bg-black overflow-hidden p-4">
            {/* Animated Liquid Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#f12630]/20 blur-[120px] pointer-events-none blob-animate"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#f12630]/10 blur-[120px] pointer-events-none blob-animate-reverse"></div>
            <div className="absolute top-[40%] left-[50%] w-[200px] h-[200px] bg-[#f12630]/5 blur-[80px] pointer-events-none blob-animate-slow"></div>

            {/* Floating Particles */}
            <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-[#f12630]/30 rounded-full float-up" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-[30%] right-[25%] w-1 h-1 bg-white/20 rounded-full float-up" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[20%] left-[60%] w-2 h-2 bg-[#f12630]/20 rounded-full float-up" style={{ animationDelay: '4s' }}></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo Area */}
                <div className="text-center mb-8 float-slow">
                    <Link href="/" className="inline-block">
                        <Image src="/Deploynix-Logo.png" alt="Deploynix Logo" width={180} height={48} className="object-contain" priority />
                    </Link>
                </div>

                {/* Login Card */}
                <div className="liquid-card glass rounded-3xl p-8 sm:p-10 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome back</h2>
                    <p className="text-gray-400 text-center text-sm mb-8">Sign in to your account to continue</p>

                    {error && (
                        <div className="bg-[color:var(--color-brand-red)]/10 border border-[color:var(--color-brand-red)]/30 text-[color:var(--color-brand-red)] p-4 rounded-xl text-sm mb-6 flex items-start">
                            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-300">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-red)]/50 focus:border-[color:var(--color-brand-red)] transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-300">Password</label>
                                <Link href="#" className="text-xs text-gray-400 hover:text-[color:var(--color-brand-red)] transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-red)]/50 focus:border-[color:var(--color-brand-red)] transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden bg-[color:var(--color-brand-red)] text-white font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(241,38,48,0.4)]"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </span>
                            {!loading && (
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-[color:var(--color-brand-red)] hover:text-white font-semibold transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

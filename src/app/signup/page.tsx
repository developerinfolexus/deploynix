"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("candidate"); // Default role
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
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
            <div className="absolute top-[30%] right-[40%] w-[250px] h-[250px] bg-[#f12630]/5 blur-[80px] pointer-events-none blob-animate-slow"></div>

            {/* Floating Particles */}
            <div className="absolute top-[15%] right-[10%] w-1.5 h-1.5 bg-[#f12630]/30 rounded-full float-up" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[50%] left-[10%] w-1 h-1 bg-white/20 rounded-full float-up" style={{ animationDelay: '3s' }}></div>
            <div className="absolute bottom-[25%] right-[55%] w-2 h-2 bg-[#f12630]/20 rounded-full float-up" style={{ animationDelay: '5s' }}></div>

            <div className="w-full max-w-lg relative z-10 my-8">
                {/* Logo Area */}
                <div className="text-center mb-8 float-slow">
                    <Link href="/" className="inline-block">
                        <Image src="/Deploynix-Logo.png" alt="Deploynix Logo" width={180} height={48} className="object-contain" priority />
                    </Link>
                </div>

                {/* Signup Card */}
                <div className="liquid-card glass rounded-3xl p-8 sm:p-10 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">Create an account</h2>
                    <p className="text-gray-400 text-center text-sm mb-8">Join Deploynix to find your next opportunity</p>

                    {error && (
                        <div className="bg-[color:var(--color-brand-red)]/10 border border-[color:var(--color-brand-red)]/30 text-[color:var(--color-brand-red)] p-4 rounded-xl text-sm mb-6 flex items-start">
                            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div className="p-1 bg-black/40 rounded-xl flex border border-gray-700/50">
                            <button
                                type="button"
                                onClick={() => setRole("candidate")}
                                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${role === "candidate"
                                    ? "bg-gray-800 text-white shadow-md border border-gray-600/50"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                I'm a Candidate
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("employer")}
                                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${role === "employer"
                                    ? "bg-gray-800 text-white shadow-md border border-gray-600/50"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                I'm an Employer
                            </button>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-300">
                                {role === "employer" ? "Company name" : "Full name"}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black/40 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-red)]/50 focus:border-[color:var(--color-brand-red)] transition-all"
                                    placeholder={role === "employer" ? "Acme Corp" : "John Doe"}
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="block text-sm font-medium text-gray-300">Password</label>
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
                                    minLength={6}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden bg-[color:var(--color-brand-red)] text-white font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(241,38,48,0.4)] mt-4"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </span>
                            {!loading && (
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[color:var(--color-brand-red)] hover:text-white font-semibold transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function CandidateDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    if (!token) redirect("/login");

    const session = await verifyAuth(token.value);
    if (!session || session.role !== "candidate") redirect("/login");

    const applicationsCount = await db.application.count({
        where: { candidate_id: session.userId },
    });

    const applications = await db.application.findMany({
        where: { candidate_id: session.userId },
        include: { job: true },
        orderBy: { applied_at: "desc" },
        take: 10,
    });

    return (
        <div className="flex min-h-[calc(100vh-73px)] bg-black">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-950 border-r border-gray-800 hidden md:block">
                <div className="p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Dashboard Menu</h2>
                    <nav className="space-y-2">
                        <Link href="/candidate-dashboard" className="flex items-center px-4 py-3 bg-[color:var(--color-brand-red)]/10 text-[color:var(--color-brand-red)] rounded-xl font-medium transition-colors border border-[color:var(--color-brand-red)]/20">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            Overview
                        </Link>
                        <Link href="/jobs" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            Find Jobs
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                            Saved Jobs
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            Profile
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                            <p className="text-gray-400">Here is your application overview and upcoming activity.</p>
                        </div>
                        <Link href="/jobs" className="bg-[color:var(--color-brand-red)] hover:bg-[color:var(--color-brand-red)]/90 text-white font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center">
                            Browse Jobs <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="liquid-card glass p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#f12630]/20">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-400 mb-1">Applications Submitted</h3>
                            <p className="text-4xl font-extrabold text-white mt-2">{applicationsCount}</p>
                        </div>
                        <div className="liquid-card glass p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#f12630]/20">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-400 mb-1">Resumes Uploaded</h3>
                            <p className="text-4xl font-extrabold text-white mt-2">{applications.filter(a => a.resume_url && a.resume_url !== "No resume provided").length}</p>
                        </div>
                        <div className="liquid-card glass p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#f12630]/20">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-400 mb-1">Interviews</h3>
                            <p className="text-4xl font-extrabold text-white mt-2">0</p>
                        </div>
                    </div>

                    <div className="glass rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-800">
                            <h3 className="text-xl font-bold text-white">Recent Applications</h3>
                        </div>
                        {applications.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 py-12">
                                <p>You haven&apos;t applied to any jobs yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-800/50">
                                {applications.map((app) => (
                                    <div key={app.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-lg font-bold text-white">
                                                {app.job.company_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{app.job.job_title}</h4>
                                                <p className="text-gray-400 text-sm">{app.job.company_name} · {new Date(app.applied_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${app.application_status === "accepted" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                    app.application_status === "rejected" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                        app.application_status === "reviewed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                }`}>
                                                {app.application_status.charAt(0).toUpperCase() + app.application_status.slice(1)}
                                            </span>
                                            {app.resume_url && app.resume_url !== "No resume provided" && (
                                                <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-brand-red)] hover:text-white text-sm font-medium flex items-center transition-colors">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    Resume
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}


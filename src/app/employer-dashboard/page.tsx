import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function EmployerDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    if (!token) redirect("/login");

    const session = await verifyAuth(token.value);
    if (!session || session.role !== "employer") redirect("/login");

    const jobsCount = await db.job.count({
        where: { posted_by: session.userId },
    });

    const applicantsCount = await db.application.count({
        where: {
            job: {
                posted_by: session.userId,
            },
        },
    });

    const jobs = await db.job.findMany({
        where: { posted_by: session.userId },
        include: {
            applications: {
                include: { candidate: true },
                orderBy: { applied_at: "desc" },
            },
        },
        orderBy: { created_at: "desc" },
    });

    return (
        <div className="flex min-h-[calc(100vh-73px)] bg-black">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-950 border-r border-gray-800 hidden md:block">
                <div className="p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Employer Menu</h2>
                    <nav className="space-y-2">
                        <Link href="/employer-dashboard" className="flex items-center px-4 py-3 bg-[color:var(--color-brand-red)]/10 text-[color:var(--color-brand-red)] rounded-xl font-medium transition-colors border border-[color:var(--color-brand-red)]/20">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            Overview
                        </Link>
                        <Link href="/employer-dashboard/post-job" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Post Job
                        </Link>
                        <Link href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Applicants
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Employer Dashboard</h1>
                            <p className="text-gray-400">Manage your job postings and review applicants.</p>
                        </div>
                        <Link href="/employer-dashboard/post-job" className="bg-[color:var(--color-brand-red)] hover:bg-[color:var(--color-brand-red)]/90 text-white font-bold py-2.5 px-6 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(241,38,48,0.4)] flex items-center">
                            Post New Job <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="liquid-card glass p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#f12630]/20">
                            <h3 className="text-sm font-medium text-gray-400 mb-1">Active Jobs</h3>
                            <p className="text-4xl font-extrabold text-white mt-2">{jobsCount}</p>
                        </div>
                        <div className="liquid-card glass p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#f12630]/20">
                            <h3 className="text-sm font-medium text-gray-400 mb-1">Total Applicants</h3>
                            <p className="text-4xl font-extrabold text-white mt-2">{applicantsCount}</p>
                        </div>
                        <div className="liquid-card glass p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#f12630]/20">
                            <h3 className="text-sm font-medium text-gray-400 mb-1">Resumes Received</h3>
                            <p className="text-4xl font-extrabold text-white mt-2">{jobs.reduce((acc, j) => acc + j.applications.filter(a => a.resume_url && a.resume_url !== "No resume provided").length, 0)}</p>
                        </div>
                    </div>

                    {/* Job Postings with Applicants */}
                    {jobs.length === 0 ? (
                        <div className="glass rounded-2xl p-12 text-center">
                            <svg className="w-12 h-12 mb-4 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="text-gray-400 mb-4">You haven&apos;t posted any jobs yet.</p>
                            <Link href="/employer-dashboard/post-job" className="text-[color:var(--color-brand-red)] hover:underline font-medium">Post your first job</Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {jobs.map((job) => (
                                <div key={job.id} className="glass rounded-2xl overflow-hidden">
                                    <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{job.job_title}</h3>
                                            <p className="text-gray-400 text-sm">{job.company_name} · {job.location} · {job.salary_range}</p>
                                        </div>
                                        <span className="bg-[color:var(--color-brand-red)]/10 text-[color:var(--color-brand-red)] border border-[color:var(--color-brand-red)]/20 text-sm px-4 py-1.5 rounded-full font-semibold">
                                            {job.applications.length} applicant{job.applications.length !== 1 ? "s" : ""}
                                        </span>
                                    </div>

                                    {job.applications.length === 0 ? (
                                        <div className="p-6 text-center text-gray-500 py-8">
                                            <p>No applications yet for this position.</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-800/50">
                                            {job.applications.map((app) => (
                                                <div key={app.id} className="p-6 hover:bg-white/[0.02] transition-colors">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                                                                {(app.applicant_name || app.candidate.name || "?").charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-white text-lg">{app.applicant_name || app.candidate.name}</h4>
                                                                <p className="text-gray-400 text-sm">{app.candidate.email}</p>
                                                                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-gray-400">
                                                                    {app.phone && (
                                                                        <span className="flex items-center">
                                                                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                                            {app.phone}
                                                                        </span>
                                                                    )}
                                                                    {app.address && (
                                                                        <span className="flex items-center">
                                                                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                                            {app.address}
                                                                        </span>
                                                                    )}
                                                                    <span className="flex items-center">
                                                                        <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                        {new Date(app.applied_at).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 flex-shrink-0">
                                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${app.application_status === "accepted" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                                    app.application_status === "rejected" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                                        app.application_status === "reviewed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                                            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                                }`}>
                                                                {app.application_status.charAt(0).toUpperCase() + app.application_status.slice(1)}
                                                            </span>
                                                            {app.resume_url && app.resume_url !== "No resume provided" && (
                                                                <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="bg-[color:var(--color-brand-red)]/10 text-[color:var(--color-brand-red)] hover:bg-[color:var(--color-brand-red)] hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all flex items-center border border-[color:var(--color-brand-red)]/20">
                                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                                    Resume
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

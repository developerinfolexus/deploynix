"use client";

import { useEffect, useState } from "react";

interface Company {
    name: string;
    jobCount: number;
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await fetch("/api/jobs");
                const data = await res.json();
                if (data.jobs) {
                    const companyMap: Record<string, number> = {};
                    for (const job of data.jobs) {
                        companyMap[job.company_name] = (companyMap[job.company_name] || 0) + 1;
                    }
                    const list = Object.entries(companyMap).map(([name, jobCount]) => ({ name, jobCount }));
                    list.sort((a, b) => b.jobCount - a.jobCount);
                    setCompanies(list);
                }
            } catch (err) {
                console.error("Error fetching companies:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    }, []);

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="relative pt-24 pb-16 overflow-hidden border-b border-gray-900">
                <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] bg-[#f12630]/10 blur-[120px] pointer-events-none z-0 blob-animate"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[400px] h-[400px] bg-[#f12630]/5 blur-[100px] pointer-events-none z-0 blob-animate-reverse"></div>
                <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-[#f12630]/25 rounded-full float-up" style={{ animationDelay: '1s' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto float-slow">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            Top <span className="shimmer-text">Companies</span>
                        </h1>
                        <p className="text-xl text-gray-400">
                            Discover {companies.length} companies hiring on Deploynix.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="animate-spin h-10 w-10 text-[color:var(--color-brand-red)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-400 font-medium">Loading companies...</p>
                    </div>
                ) : companies.length === 0 ? (
                    <div className="text-center py-32 bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-800/50">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No companies yet</h3>
                        <p className="text-gray-400 max-w-md mx-auto">Companies will appear here once employers start posting jobs.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companies.map((company) => (
                            <div key={company.name} className="liquid-card group glass rounded-3xl p-8 hover:border-[#f12630]/30">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-2xl font-bold text-white group-hover:border-[color:var(--color-brand-red)]/50 transition-colors">
                                        {company.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-[color:var(--color-brand-red)] transition-colors">{company.name}</h3>
                                        <p className="text-gray-400 text-sm">{company.jobCount} open position{company.jobCount !== 1 ? "s" : ""}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-5 border-t border-gray-800">
                                    <span className="bg-[color:var(--color-brand-red)]/10 text-[color:var(--color-brand-red)] border border-[color:var(--color-brand-red)]/20 text-xs px-3 py-1 rounded-full font-semibold">Hiring</span>
                                    <span className="text-gray-500 text-sm">View Jobs →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

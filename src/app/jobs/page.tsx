"use client";

import { useEffect, useState, useRef } from "react";

interface Job {
    id: string;
    job_title: string;
    company_name: string;
    location: string;
    salary_range: string;
    job_description: string;
    posted_by: string;
    created_at: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [applyingTo, setApplyingTo] = useState<Job | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [applicantName, setApplicantName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("/api/jobs");
                const data = await res.json();
                if (data.jobs) {
                    setJobs(data.jobs);
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    const handleApply = async () => {
        if (!applyingTo) return;
        setSubmitting(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("job_id", applyingTo.id);
            formData.append("applicant_name", applicantName);
            formData.append("phone", phone);
            formData.append("address", address);
            if (resumeFile) {
                formData.append("resume", resumeFile);
            }

            const res = await fetch("/api/apply", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: "Application submitted successfully!" });
                setTimeout(() => {
                    setApplyingTo(null);
                    setResumeFile(null);
                    setApplicantName("");
                    setPhone("");
                    setAddress("");
                    setMessage(null);
                }, 2000);
            } else {
                setMessage({ type: "error", text: data.error || "Failed to apply." });
            }
        } catch {
            setMessage({ type: "error", text: "Network error. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header Section */}
            <div className="relative pt-24 pb-16 overflow-hidden border-b border-gray-900">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#f12630]/10 blur-[120px] pointer-events-none z-0 blob-animate"></div>
                <div className="absolute bottom-[-30%] right-[10%] w-[400px] h-[400px] bg-[#f12630]/5 blur-[100px] pointer-events-none z-0 blob-animate-reverse"></div>
                <div className="absolute top-[10%] left-[5%] w-1.5 h-1.5 bg-[#f12630]/30 rounded-full float-up" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-white/20 rounded-full float-up" style={{ animationDelay: '2s' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto float-slow">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            Explore <span className="shimmer-text">Openings</span>
                        </h1>
                        <p className="text-xl text-gray-400">
                            Discover your next career move among {jobs.length} open positions.
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
                        <p className="text-gray-400 font-medium">Loading opportunities...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-32 bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-800/50">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No jobs available right now</h3>
                        <p className="text-gray-400 max-w-md mx-auto">There are currently no open positions on the platform. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div key={job.id} className="liquid-card group relative glass rounded-3xl p-6 md:p-8 hover:border-[#f12630]/30 flex flex-col h-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-brand-red)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-xl font-bold text-white">
                                            {job.company_name.charAt(0)}
                                        </div>
                                        <span className="bg-[color:var(--color-brand-red)]/10 text-[color:var(--color-brand-red)] border border-[color:var(--color-brand-red)]/20 text-xs px-3 py-1 rounded-full font-semibold">New</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-[color:var(--color-brand-red)] transition-colors">{job.job_title}</h3>
                                    <p className="text-gray-400 font-medium mb-6">{job.company_name}</p>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 p-2.5 rounded-xl">
                                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 text-gray-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            </div>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-300 bg-gray-800/50 p-2.5 rounded-xl">
                                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center mr-3 text-gray-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            {job.salary_range}
                                        </div>
                                    </div>

                                    <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">{job.job_description}</p>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => { setApplyingTo(job); setResumeFile(null); setApplicantName(""); setPhone(""); setAddress(""); setMessage(null); }}
                                            className="w-full relative group/btn overflow-hidden bg-[color:var(--color-brand-red)] text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(241,38,48,0.4)]"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                Apply Now
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </span>
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover/btn:scale-100 group-hover/btn:bg-white/20"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Apply Modal */}
            {applyingTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !submitting && setApplyingTo(null)}></div>

                    <div className="relative w-full max-w-lg glass rounded-3xl p-8 shadow-2xl border border-white/10">
                        {/* Close button */}
                        <button onClick={() => !submitting && setApplyingTo(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-1">Apply to</h3>
                        <p className="text-[color:var(--color-brand-red)] font-semibold text-lg mb-1">{applyingTo.job_title}</p>
                        <p className="text-gray-400 text-sm mb-6">at {applyingTo.company_name}</p>

                        {/* Applicant Info Fields */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name <span className="text-[color:var(--color-brand-red)]">*</span></label>
                                <input type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="John Doe" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f12630]/50 focus:border-transparent transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f12630]/50 focus:border-transparent transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City, State, Country" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f12630]/50 focus:border-transparent transition-all" />
                            </div>
                        </div>

                        {/* File Upload Area */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Upload Resume <span className="text-gray-500">(PDF or Word, max 5MB)</span>
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-dashed border-gray-700 hover:border-[#f12630]/50 rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 group/upload hover:bg-[#f12630]/5"
                            >
                                {resumeFile ? (
                                    <>
                                        <div className="w-14 h-14 rounded-2xl bg-[#f12630]/10 flex items-center justify-center mb-3">
                                            <svg className="w-7 h-7 text-[color:var(--color-brand-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </div>
                                        <p className="text-white font-medium text-sm">{resumeFile.name}</p>
                                        <p className="text-gray-500 text-xs mt-1">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB — Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mb-3 group-hover/upload:bg-[#f12630]/10 transition-colors">
                                            <svg className="w-7 h-7 text-gray-500 group-hover/upload:text-[color:var(--color-brand-red)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        </div>
                                        <p className="text-gray-400 font-medium text-sm">Click to upload your resume</p>
                                        <p className="text-gray-600 text-xs mt-1">PDF or Word document</p>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Message */}
                        {message && (
                            <div className={`p-4 rounded-xl text-sm mb-6 flex items-center ${message.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-400" : "bg-[#f12630]/10 border border-[#f12630]/30 text-[color:var(--color-brand-red)]"}`}>
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {message.type === "success" ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    )}
                                </svg>
                                {message.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleApply}
                            disabled={submitting}
                            className="w-full relative group/btn overflow-hidden bg-[color:var(--color-brand-red)] text-white font-bold py-4 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(241,38,48,0.4)]"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading & Applying...
                                    </>
                                ) : (
                                    <>Submit Application{resumeFile ? " with Resume" : ""}</>
                                )}
                            </span>
                            {!submitting && (
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover/btn:scale-100 group-hover/btn:bg-white/20"></div>
                            )}
                        </button>

                        <p className="text-gray-600 text-xs text-center mt-4">
                            {resumeFile ? "Your resume will be securely uploaded to Google Drive." : "You can apply without a resume, but uploading one is recommended."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

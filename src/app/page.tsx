import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Liquid Blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#f12630]/20 blur-[120px] pointer-events-none blob-animate"></div>
        <div className="absolute bottom-[-30%] left-[-15%] w-[500px] h-[500px] bg-[#f12630]/10 blur-[100px] pointer-events-none blob-animate-reverse"></div>
        <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] bg-[#f12630]/5 blur-[80px] pointer-events-none blob-animate-slow"></div>

        {/* Floating Particles */}
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-[#f12630]/40 rounded-full float-up" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-[#f12630]/30 rounded-full float-up" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] left-[70%] w-1 h-1 bg-white/20 rounded-full float-up" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[40%] left-[20%] w-1 h-1 bg-white/15 rounded-full float-up" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[70%] right-[30%] w-2 h-2 bg-[#f12630]/20 rounded-full float-up" style={{ animationDelay: '3s' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="float-slow">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-8">
              Find Your <span className="shimmer-text">Dream Job</span> Faster
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Deploynix is the modern platform connecting top talent with industry-leading companies. Discover opportunities that match your ambition.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/jobs"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-[color:var(--color-brand-red)] rounded-full hover:shadow-[0_0_40px_rgba(241,38,48,0.6)] hover:scale-105 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center">
                Find Jobs
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 rounded-full scale-0 bg-white/20 transition-transform duration-300 group-hover:scale-100"></div>
            </Link>
            <Link
              href="/employer-dashboard"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/25 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-gray-950/50 border-t border-b border-gray-900 relative overflow-hidden">
        {/* Background blob */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f12630]/5 blur-[150px] pointer-events-none morph-shape"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose <span className="shimmer-text">Deploynix</span>?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to hire top talent or find your next big role, all in one platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Smart Matching", desc: "Our algorithm connects you with opportunities that fit your skills.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Fast Applications", desc: "Apply to multiple jobs with a single click using your unified profile.", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" },
              { title: "Employer Dashboards", desc: "Manage postings, track applicants, and hire efficiently.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { title: "Resume Management", desc: "Build, upload, and organize your professional experience.", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }
            ].map((feature, i) => (
              <div key={i} className="liquid-card group p-8 rounded-3xl glass hover:border-[#f12630]/30" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-[#f12630]/10 border border-[#f12630]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#f12630]/20 transition-all duration-300">
                  <svg className="w-7 h-7 text-[color:var(--color-brand-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[color:var(--color-brand-red)] transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-[#f12630]/5 blur-[100px] pointer-events-none blob-animate-reverse"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured <span className="shimmer-text">Opportunities</span></h2>
              <p className="text-gray-400">Discover hand-picked jobs from top companies.</p>
            </div>
            <Link href="/jobs" className="hidden sm:flex text-[color:var(--color-brand-red)] hover:text-white items-center font-medium transition-colors group">
              View all jobs <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Senior Frontend Engineer", company: "TechNova", location: "San Francisco, CA", salary: "$140k - $180k", type: "Full-time" },
              { title: "Product Designer", company: "CreativeStudio", location: "Remote", salary: "$110k - $140k", type: "Contract" },
              { title: "Backend Developer", company: "DataFlow", location: "New York, NY", salary: "$130k - $160k", type: "Full-time" },
            ].map((job, i) => (
              <div key={i} className="liquid-card group glass rounded-3xl p-8 flex flex-col h-full hover:border-[#f12630]/30" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-xl font-bold text-white group-hover:border-[#f12630]/40 transition-colors morph-shape" style={{ animationDuration: '10s' }}>
                    {job.company.charAt(0)}
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold bg-[#f12630]/10 text-[color:var(--color-brand-red)] border border-[#f12630]/20 rounded-full">{job.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[color:var(--color-brand-red)] transition-colors">{job.title}</h3>
                <p className="text-gray-400 font-medium mb-4">{job.company}</p>
                <div className="mt-auto space-y-2 mb-6">
                  <div className="flex items-center text-gray-400 text-sm bg-gray-800/40 p-2.5 rounded-xl">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm bg-gray-800/40 p-2.5 rounded-xl">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {job.salary}
                  </div>
                </div>
                <Link href="/jobs" className="w-full text-center relative overflow-hidden bg-white/5 hover:bg-[#f12630] text-white font-medium py-3 rounded-xl transition-all duration-300 border border-white/10 hover:border-[#f12630] hover:shadow-[0_0_20px_rgba(241,38,48,0.3)] group/btn block">
                  <span className="relative z-10">Apply Now</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/jobs" className="text-[color:var(--color-brand-red)] hover:text-white font-medium transition-colors">
              View all jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
        {/* Animated CTA blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#f12630]/10 blur-[120px] pointer-events-none z-0 pulse-glow"></div>
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-[#f12630]/5 blur-[60px] pointer-events-none blob-animate"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-[#f12630]/5 blur-[80px] pointer-events-none blob-animate-reverse"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="liquid-card glass rounded-[2rem] p-10 md:p-16 text-center max-w-4xl mx-auto hover:border-[#f12630]/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to accelerate your <span className="shimmer-text">career</span>?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join thousands of professionals finding their next role on Deploynix.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="group relative px-8 py-4 bg-[color:var(--color-brand-red)] text-white font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(241,38,48,0.5)] hover:scale-105 overflow-hidden">
                <span className="relative z-10">Create Free Account</span>
                <div className="absolute inset-0 rounded-full scale-0 bg-white/20 transition-transform duration-300 group-hover:scale-100"></div>
              </Link>
              <Link href="/login" className="px-8 py-4 bg-transparent border border-gray-600 hover:border-[#f12630]/50 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(241,38,48,0.15)]">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

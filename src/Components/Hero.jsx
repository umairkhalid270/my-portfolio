import { useEffect, useRef } from "react";

export default function Hero() {
  // Fade-in animation
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.remove("opacity-0", "translate-y-8");
      heroRef.current.classList.add("opacity-100", "translate-y-0");
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#060a12] via-[#0c1220] to-[#0a0f18] px-4 pt-12 pb-20 transition-all duration-1000 opacity-0 translate-y-8 sm:pt-16 sm:pb-24 md:pt-20"
    >
      {/* -- BACKGROUND ORBS -- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {/* Cyan Orb */}
        <div className="absolute left-[-5%] top-10 h-60 w-60 rounded-full bg-cyan-400 opacity-30 blur-3xl animate-float-slow"></div>
        {/* Purple Orb */}
        <div className="absolute bottom-[12%] right-[-8%] h-72 w-72 rounded-full bg-purple-400 opacity-25 blur-3xl animate-float-mid"></div>
        {/* Cyan Mini Orb */}
        <div className="absolute top-[28%] right-[7%] h-[90px] w-[90px] rounded-full bg-cyan-300 opacity-20 blur-2xl animate-float"></div>
        {/* Super subtle grid overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* -- HERO CONTENT -- */}
      <div className="relative z-20 flex w-full max-w-3xl flex-col items-center">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-1.5 shadow-lg shadow-cyan-800/10 ring-1 ring-green-400/15">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
          </span>
          <span className="text-xs font-medium tracking-wide text-slate-300">Available for freelance work</span>
        </div>

        {/* Heading — !text-* overrides global h1 styles; !my-0 clears index.css h1 margin that added extra top gap */}
        <h1 className="text-center text-4xl font-extrabold !text-white !my-0 drop-shadow-sm sm:text-5xl md:text-6xl">
          Hi, I'm Umair Khalid
          <br />
          <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text !text-transparent text-[2.1rem] sm:text-[2.5rem] md:text-5xl font-extrabold tracking-tight">
            Full Stack Developer
          </span>
        </h1>

        {/* Bio */}
        <p className="mt-7 max-w-xl text-center text-base font-medium text-slate-400 sm:text-lg">
          I build fast, modern web applications using React, Node.js and the latest AI-powered tools.<br className="hidden sm:inline" /> Open to freelance projects and full-time roles.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="#projects"
            className="inline-block rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 px-8 py-3 text-base font-bold text-slate-900 shadow-md shadow-cyan-900/10 transition duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            View My Work
          </a>
          <a
            href="/Umair_Khalid_CV.pdf"
            download
            className="inline-block rounded-xl border border-cyan-400 px-8 py-3 text-base font-bold text-cyan-200 transition duration-200 hover:bg-cyan-400/10 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Download CV
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid w-full max-w-md grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white drop-shadow">2+</span>
            <span className="mt-1 text-sm font-medium text-slate-400">Projects Built</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white drop-shadow">1+</span>
            <span className="mt-1 text-sm font-medium text-slate-400">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white drop-shadow">100%</span>
            <span className="mt-1 text-sm font-medium text-slate-400">Code Quality</span>
          </div>
        </div>
      </div>

      {/* Custom floating orb animations */}
      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px);}
          50%  { transform: translateY(-18px);}
          100% { transform: translateY(0px);}
        }
        @keyframes float-mid {
          0%   { transform: translateY(0px) scale(1);}
          50%  { transform: translateY(24px) scale(1.06);}
          100% { transform: translateY(0px) scale(1);}
        }
        @keyframes float-slow {
          0%   { transform: translateY(0px) scale(1);}
          40%  { transform: translateY(32px) scale(1.08);}
          100% { transform: translateY(0px) scale(1);}
        }
        .animate-float     { animation: float 7s ease-in-out infinite; }
        .animate-float-mid { animation: float-mid 14s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 16s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
import { useState } from "react";

/** SVG mark: </> + neural spark — web dev + AI in one glance */
function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="navLogoGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="navLogoGlow" x1="24" y1="8" x2="34" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" stopOpacity="0.95" />
          <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Rounded tile frame */}
      <rect x="2" y="2" width="36" height="36" rx="10" stroke="url(#navLogoGrad)" strokeWidth="1.2" opacity="0.5" />
      <rect x="4.5" y="4.5" width="31" height="31" rx="8" fill="url(#navLogoGrad)" fillOpacity="0.11" />
      {/* </> — classic code chevrons + slash */}
      <path
        d="M12 10L6 20l6 10"
        stroke="url(#navLogoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 27l4-14" stroke="url(#navLogoGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.92" />
      <path
        d="M22 10l6 10-6 10"
        stroke="url(#navLogoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AI spark / node cluster */}
      <circle cx="29" cy="11" r="2.2" fill="url(#navLogoGlow)" />
      <circle cx="32.5" cy="15" r="1.2" fill="#67e8f9" opacity="0.95" />
      <circle cx="26.5" cy="14.5" r="0.85" fill="#ddd6fe" opacity="0.9" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-gradient-to-b from-[#060a12] via-[#0c1220] to-[#0a0f18] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md">
      {/* Subtle top sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
        aria-hidden
      />

      <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-8 lg:px-10">
        {/* Brand: mark + wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-3 rounded-xl outline-none ring-cyan-400/40 focus-visible:ring-2"
        >
          <span className="relative shrink-0 transition duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
            <LogoMark />
          </span>
          <span className="flex flex-col leading-none sm:flex-row sm:items-baseline sm:gap-1.5">
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-[1.35rem]">
              Umair
            </span>
            <span className="font-mono text-sm font-medium tracking-wide text-slate-500 transition group-hover:text-cyan-400/90 sm:text-base">
              .dev
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-cyan-100"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-300 transition hover:border-cyan-500/35 hover:bg-cyan-500/10 hover:text-cyan-100 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel — matches header treatment */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-cyan-500/10 bg-[#0a0f18]/95 px-5 py-4 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-cyan-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

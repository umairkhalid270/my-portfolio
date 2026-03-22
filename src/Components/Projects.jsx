import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const PROJECTS = [
  {
    title: "Portfolio Website",
    description:
      "Personal developer portfolio built with React and Tailwind CSS featuring dark techy design, smooth animations and responsive layout.",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: "https://github.com/umairkhalid270/my-portfolio",
    live: "#",
    category: "React",
  },
  {
    title: "Task Manager App",
    description:
      "Full-stack task management application with user authentication, CRUD operations and real-time updates. Built with React and Node.js.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "#",
    live: "#",
    category: "Node.js",
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content generation tool using OpenAI API. Users can generate blog posts, social captions and marketing copy instantly.",
    tech: ["React", "OpenAI API", "Node.js"],
    github: "#",
    live: "#",
    category: "AI",
  },
];

const FILTERS = [
  { label: "All", value: "All" },
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "AI", value: "AI" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = PROJECTS.filter(
    (p) => active === "All" || p.category === active
  );

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-16 bg-[#060a12] z-20"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl !font-extrabold !text-white text-center mb-2">
          What I&apos;ve Built
        </h2>
        <div className="mx-auto mb-10 h-1.5 w-32 rounded-full bg-gradient-to-r from-cyan-400/80 via-cyan-300/60 to-purple-400/90" />
        {/* Filters */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={classNames(
                "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none",
                active === f.value
                  ? "bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 text-[#060a12] shadow-md scale-105 ring-2 ring-cyan-400/40"
                  : "bg-white/5 border border-cyan-300/10 text-cyan-100 hover:bg-cyan-400/15 hover:text-cyan-100"
              )}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        {/* Projects grid */}
        <div className="grid gap-8 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <div
              key={project.title}
              className="group bg-gradient-to-b from-[#101a2a]/70 to-[#090f20] border border-cyan-300/10 rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.13)] p-6 flex flex-col h-full transition-all duration-300 cursor-pointer
                hover:scale-[1.037] hover:shadow-[0_6px_32px_0_rgba(34,211,238,0.16),0_0px_24px_0_rgba(167,139,250,0.15)] hover:ring-2 hover:ring-cyan-400/25"
              style={{
                transitionProperty: "box-shadow,transform,filter,opacity",
              }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-300 text-sm mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full border border-cyan-300/50 text-xs font-semibold text-cyan-200 bg-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto pt-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-cyan-400 text-cyan-200 bg-[#060a12] hover:bg-cyan-400 hover:text-[#060a12] transition-colors duration-200"
                >
                  <FaGithub /> Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNames(
                    "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-purple-400 text-purple-200 bg-[#060a12] transition-colors duration-200",
                    project.live && project.live !== "#"
                      ? "hover:bg-purple-400 hover:text-[#060a12] cursor-pointer"
                      : "opacity-60 pointer-events-none cursor-not-allowed"
                  )}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
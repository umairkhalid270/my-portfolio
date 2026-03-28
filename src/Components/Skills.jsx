import { useState } from "react";

const SKILLS = [
  {
    name: "React",
    category: "Frontend",
    level: "Advanced",
    levelNum: 90,
  },
  {
    name: "JavaScript",
    category: "Frontend",
    level: "Advanced",
    levelNum: 90,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Intermediate",
    levelNum: 65,
  },
  {
    name: "HTML/CSS",
    category: "Frontend",
    level: "Advanced",
    levelNum: 90,
  },
  {
    name: "Node.js",
    category: "Backend",
    level: "Intermediate",
    levelNum: 65,
  },
  {
    name: "Express",
    category: "Backend",
    level: "Intermediate",
    levelNum: 65,
  },
  {
    name: "MongoDB",
    category: "Backend",
    level: "Beginner",
    levelNum: 30,
  },
  {
    name: "Git",
    category: "Tools",
    level: "Intermediate",
    levelNum: 60,
  },
  {
    name: "GitHub",
    category: "Tools",
    level: "Intermediate",
    levelNum: 65,
  },
  {
    name: "Cursor AI",
    category: "Tools",
    level: "Advanced",
    levelNum: 90,
  },
  {
    name: "Figma",
    category: "Tools",
    level: "Beginner",
    levelNum: 25,
  },
];

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "Tools", value: "Tools" },
];

const CATEGORY_COLORS = {
  Frontend: "from-cyan-400 to-sky-300",
  Backend: "from-purple-400 to-violet-500",
  Tools: "from-emerald-400 to-cyan-400",
};

const LEVEL_COLORS = {
  Advanced: "bg-gradient-to-r from-cyan-400 to-purple-400",
  Intermediate: "bg-gradient-to-r from-sky-400 to-violet-400",
  Beginner: "bg-gradient-to-r from-slate-500 to-slate-600",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Skills() {
  const [active, setActive] = useState("All");

  return (
    <section
      id="skills"
      className="relative z-20 w-full px-6 py-16 bg-[#060a12]"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        {/* !text-white / !font-extrabold: global index.css h2 rules are unlayered and would otherwise override Tailwind utilities */}
        <h2 className="text-3xl sm:text-4xl !font-extrabold !text-white text-center mb-2">
          What I Work With
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
        {/* Skills grid */}
        <div className="grid gap-7 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => {
            // Determine if the skill passes the filter
            const isActive =
              active === "All" || skill.category === active;

            return (
              <div
                key={skill.name}
                className={classNames(
                  "transition-all duration-500 transform",
                  isActive
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-30 scale-95 pointer-events-none blur-[1px]"
                )}
                style={{
                  transitionProperty:
                    "opacity, transform, box-shadow, filter",
                }}
              >
                <div className="bg-gradient-to-b from-[#101a2a]/70 to-[#090f20] border border-cyan-300/10 rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.12)] p-6 flex flex-col items-start hover:scale-[1.035] transition-transform duration-200 cursor-pointer group">
                  {/* Skill Name */}
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-xl font-bold text-white tracking-tight">
                      {skill.name}
                    </span>
                    {/* Category badge */}
                    <span
                      className={classNames(
                        "ml-auto px-3 py-0.5 text-xs font-semibold rounded-full uppercase tracking-widest bg-gradient-to-r text-[#060a12] shadow-sm border-2 border-cyan-300/20",
                        CATEGORY_COLORS[skill.category]
                      )}
                    >
                      {skill.category}
                    </span>
                  </div>
                  {/* Proficiency */}
                  <div className="mt-6 w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-300">
                        {skill.level}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{skill.levelNum}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-lg overflow-hidden">
                      <div
                        className={
                          classNames(
                            "h-2.5 rounded-lg transition-all duration-500",
                            LEVEL_COLORS[skill.level]
                          )
                        }
                        style={{ width: `${skill.levelNum}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
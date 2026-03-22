import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-hide success message after 3s
  useEffect(() => {
    if (submitted) {
      const timeout = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [submitted]);

  // Returns an object of field errors; empty object means the form is valid.
  function validate(fields) {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!fields.email.trim()) errs.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.email.trim())
    )
      errs.email = "Invalid email";
    if (!fields.subject.trim()) errs.subject = "Subject is required";
    if (!fields.message.trim()) errs.message = "Message is required";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    emailjs
      .send(
        "service_qzycgrd",
        "template_dubgpch",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "1MVozAsg4uj-xN3Ov"
      )
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setLoading(false);
        alert("Failed to send. Please try again.");
      });
  };

  return (
    <section
      id="contact"
      className="relative w-full px-6 py-16 bg-[#060a12] z-20"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl !font-extrabold !text-white text-center mb-2">
          Get In Touch
        </h2>
        <div className="mx-auto mb-10 h-1.5 w-32 rounded-full bg-gradient-to-r from-cyan-400/80 via-cyan-300/60 to-purple-400/90" />

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Info */}
          <div className="md:w-1/2 w-full flex flex-col justify-between bg-gradient-to-b from-[#101a2a]/70 to-[#090f20] border border-cyan-300/10 rounded-2xl p-7 mb-7 md:mb-0 shadow-[0_4px_24px_0_rgba(0,0,0,0.13)]">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-1">
                Let&apos;s work together
              </h3>
              <p className="text-slate-300 mb-7 text-sm">
                I&apos;m currently available for freelance projects and full-time roles.
                Let&apos;s build something amazing together.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <FaEnvelope className="text-cyan-400 text-lg" />
                <a
                  href="mailto:umairkhalid270@gmail.com"
                  className="text-slate-200 hover:text-cyan-300 text-sm underline decoration-cyan-400 underline-offset-2"
                >
                  umairkhalid270@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <FaMapMarkerAlt className="text-purple-400 text-lg" />
                <span className="text-slate-200 text-sm">Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://github.com/umairkhalid270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-400 bg-white/5 rounded-full p-2 border border-cyan-300/20 transition"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-400 bg-white/5 rounded-full p-2 border border-cyan-300/20 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-400 bg-white/5 rounded-full p-2 border border-cyan-300/20 transition"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 w-full bg-gradient-to-b from-[#101a2a]/70 to-[#090f20] border border-cyan-300/10 rounded-2xl p-7 shadow-[0_4px_24px_0_rgba(0,0,0,0.13)] flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-slate-200 text-sm font-medium mb-1">
                  Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded-lg bg-[#060a12]/70 border ${
                    errors.name
                      ? "border-red-400"
                      : "border-cyan-300/10 focus:border-cyan-400"
                  } text-slate-100 placeholder-slate-500 focus:outline-none transition`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.name}</span>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-200 text-sm font-medium mb-1">
                  Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded-lg bg-[#060a12]/70 border ${
                    errors.email
                      ? "border-red-400"
                      : "border-cyan-300/10 focus:border-cyan-400"
                  } text-slate-100 placeholder-slate-500 focus:outline-none transition`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>
                )}
              </div>
              <div>
                <label htmlFor="subject" className="block text-slate-200 text-sm font-medium mb-1">
                  Subject <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  autoComplete="off"
                  className={`w-full px-4 py-2 rounded-lg bg-[#060a12]/70 border ${
                    errors.subject
                      ? "border-red-400"
                      : "border-cyan-300/10 focus:border-cyan-400"
                  } text-slate-100 placeholder-slate-500 focus:outline-none transition`}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Email subject"
                />
                {errors.subject && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.subject}</span>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-slate-200 text-sm font-medium mb-1">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg bg-[#060a12]/70 border ${
                    errors.message
                      ? "border-red-400"
                      : "border-cyan-300/10 focus:border-cyan-400"
                  } text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none`}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message"
                />
                {errors.message && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-2.5 text-base font-semibold rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 text-[#060a12] shadow-md hover:from-cyan-300 hover:to-purple-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#060a12] border-t-transparent"
                      aria-hidden
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
              {submitted && (
                <div className="mt-2 text-center text-cyan-300 text-sm font-medium bg-white/5 rounded-lg py-2 animate-fade-in">
                  Message sent! I&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
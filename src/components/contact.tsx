"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Clock, Briefcase, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error(data.error || "Failed to send");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden border-t border-secondary/10">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-4">
            Let's Engineer Together
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            My inbox is always open. Whether you have a complex system design question, a project proposal, or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* Contact Details & Signals */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center order-2 md:order-1"
          >
            <h3 className="text-3xl font-heading font-black mb-8">Reach Out Directly</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 text-foreground/80 bg-secondary/5 p-4 rounded-xl border border-secondary/10">
                <Briefcase className="text-primary shrink-0" size={24} />
                <div>
                  <p className="font-bold">Open to Full Stack / Backend opportunities</p>
                  <p className="text-sm font-medium opacity-70">Actively looking for impactful engineering roles.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-foreground/80 bg-secondary/5 p-4 rounded-xl border border-secondary/10">
                <Clock className="text-accent shrink-0" size={24} />
                <div>
                  <p className="font-bold">Fast Response Rate</p>
                  <p className="text-sm font-medium opacity-70">Typically responds within 24 hours.</p>
                </div>
              </div>
            </div>

            <a href="mailto:work.jeetloharcrj@gmail.com" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:opacity-80 transition-opacity mb-8 block w-fit border-b border-primary/30 pb-1">
              work.jeetloharcrj@gmail.com
            </a>

            <div className="flex flex-wrap items-center gap-4">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-foreground text-background font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform">
                <FileText size={18} /> Download Resume
              </a>
              <div className="flex gap-3 text-foreground">
                <a href="https://github.com/Jeet-Lohar-itzJeeSKUULL" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border-2 border-secondary/20 hover:border-foreground transition-all duration-300">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/jeetlohar" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl border-2 border-secondary/20 hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-300">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 bg-secondary/5 border border-secondary/10 rounded-3xl order-1 md:order-2 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold tracking-wide uppercase text-foreground/60 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium transition-shadow placeholder:opacity-40 text-lg text-foreground"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold tracking-wide uppercase text-foreground/60 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium transition-shadow placeholder:opacity-40 text-lg text-foreground"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold tracking-wide uppercase text-foreground/60 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-5 py-4 bg-background border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium transition-shadow resize-none placeholder:opacity-40 text-lg text-foreground"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full py-5 bg-primary text-primary-foreground font-black tracking-wide uppercase rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
              >
                {status === "idle" && <><Send size={20} className="group-hover:translate-x-2 transition-transform" /> Send Message</>}
                {status === "submitting" && "Transmitting..."}
                {status === "success" && "Secured!"}
                {status === "error" && "Error Encountered"}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-emerald-500 font-bold text-center mt-2 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Message sent successfully!
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 font-bold text-center mt-2 flex items-center justify-center gap-2"
                  >
                    <AlertCircle size={18} /> Failed to send message. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

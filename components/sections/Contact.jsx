"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, RefreshCw, ArrowUpRight } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { siteSettings } from "@/lib/mockData";

const contactSchema = z.object({
  name: z.string().min(2, "Please provide your name."),
  email: z.string().email("Please provide a valid email address."),
  subject: z.string().min(1, "Please choose a subject."),
  message: z.string().min(20, "Message must be at least 20 characters."),
});

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Engineering Opportunity",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 overflow-hidden border-t border-border bg-bg-secondary/30">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Communication Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <ScrollReveal>
                <h2 className="font-cormorant text-4xl sm:text-6xl font-bold tracking-tight text-text-primary leading-[1.05]">
                  Initiate a conversation.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-4 text-text-secondary text-base sm:text-lg font-light leading-relaxed">
                  Available for engineering roles, architectural contracts, and technical advisory projects.
                </p>
              </ScrollReveal>
            </div>

            {/* Direct Cards */}
            <ScrollReveal delay={0.2} className="flex flex-col gap-3">
              <a
                href={`mailto:${siteSettings.email}`}
                className="p-5 rounded-xl bg-bg-secondary border border-border hover:border-text-muted/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-bg-primary text-text-primary border border-border-subtle group-hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors font-mono">
                      {siteSettings.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="p-5 rounded-xl bg-bg-secondary border border-border flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-bg-primary text-text-primary border border-border-subtle">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Location & Timezone
                  </span>
                  <span className="text-sm font-semibold text-text-primary">
                    {siteSettings.location} (Remote First / UTC+5:30)
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Live Response Commitment */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-2.5 text-xs font-mono text-text-muted">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Typical response turnaround within 24 hours</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div className="p-8 sm:p-10 rounded-2xl bg-bg-secondary/70 border border-border">
                {status === "success" ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                    <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans text-xl font-bold text-text-primary">
                      Message Dispatched
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed">
                      Thank you for reaching out. I have received your dispatch and will reply shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-5 py-2 rounded-lg border border-border hover:border-text-muted text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Alex Mercer"
                          className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-text-muted/60 text-sm text-text-primary placeholder:text-text-muted/40 outline-none transition-colors"
                        />
                        {errors.name && (
                          <span className="text-[11px] font-mono text-rose-400">
                            {errors.name.message}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-text-muted/60 text-sm text-text-primary placeholder:text-text-muted/40 outline-none transition-colors"
                        />
                        {errors.email && (
                          <span className="text-[11px] font-mono text-rose-400">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                        Subject
                      </label>
                      <select
                        {...register("subject")}
                        className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-text-muted/60 text-sm text-text-primary outline-none transition-colors"
                      >
                        <option value="Engineering Opportunity">Engineering Opportunity</option>
                        <option value="Architecture Consulting">Architecture Consulting</option>
                        <option value="Technical Partnership">Technical Partnership</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      {errors.subject && (
                        <span className="text-[11px] font-mono text-rose-400">
                          {errors.subject.message}
                        </span>
                      )}
                    </div>

                    {/* Row 3: Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows="4"
                        placeholder="Briefly describe the role, product requirements, or project scope..."
                        className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-text-muted/60 text-sm text-text-primary placeholder:text-text-muted/40 outline-none transition-colors resize-none"
                      />
                      {errors.message && (
                        <span className="text-[11px] font-mono text-rose-400">
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Bar */}
                    <div className="flex items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-text-primary text-text-inverse hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md hover:shadow-lg hover:shadow-primary/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {status === "sending" ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Transmission failed. Please use email.</span>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

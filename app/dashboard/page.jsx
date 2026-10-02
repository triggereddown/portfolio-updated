"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Download,
  Mail,
  Users,
  Eye,
  Database,
  ArrowUpRight,
  ShieldAlert,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import ScrollReveal from "@/components/ui/ScrollReveal";

const analyticData = [
  { day: "Mon", visitors: 140, downloads: 12 },
  { day: "Tue", visitors: 220, downloads: 18 },
  { day: "Wed", visitors: 180, downloads: 14 },
  { day: "Thu", visitors: 340, downloads: 28 },
  { day: "Fri", visitors: 290, downloads: 24 },
  { day: "Sat", visitors: 410, downloads: 35 },
  { day: "Sun", visitors: 380, downloads: 30 }
];

const mockSubmissions = [
  { id: 1, name: "Aarav Sharma", email: "aarav@ekacare.com", subject: "Job Opportunity", date: "2026-05-28", msg: "Loved your system latency cache breakdown! Let's schedule a lead engineer chat." },
  { id: 2, name: "Jessica Alba", email: "jess@google.com", subject: "Collaboration", date: "2026-05-29", msg: "Would love to feature your DreamzUI neumorphic library in our dev newsletter." },
  { id: 3, name: "Vikram Sen", email: "vik@battech.net", subject: "Freelance Project", date: "2026-05-30", msg: "Need an edge-caching PostgreSQL setup built in the next 3 weeks. You open?" }
];

const mockDownloads = [
  { ip: "103.220.12.8", region: "Kolkata, India", date: "2026-05-31 10:20", agent: "Mac OS / Chrome" },
  { ip: "54.80.12.180", region: "Virginia, US", date: "2026-05-31 08:14", agent: "Windows / Firefox" },
  { ip: "89.207.132.5", region: "London, UK", date: "2026-05-30 19:42", agent: "Ubuntu / Chrome" }
];

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isAuthenticated) {
    /* Premium Login form overlay */
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-bg-primary px-6 py-24 select-none">
        <ScrollReveal className="w-full max-w-sm bg-bg-secondary border border-border p-8 rounded-xl flex flex-col gap-6 shadow-2xl relative">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-2xl" role="img" aria-label="shield">🛡️</span>
            <h1 className="font-display text-xl font-bold text-text-primary">Admin Access Portal</h1>
            <p className="text-xs text-text-secondary">Password: <span className="font-mono text-primary font-bold">admin</span></p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-text-secondary uppercase">Authorization Token</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded bg-bg-primary border border-border focus:border-primary text-sm text-text-primary outline-none transition-colors"
              />
              {loginError && (
                <span className="text-[10px] font-mono text-accent inline-flex items-center gap-1 mt-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Invalid credentials token.</span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-center py-2.5 bg-text-primary text-text-inverse hover:bg-primary font-mono text-xs uppercase font-bold tracking-wider rounded transition-colors"
            >
              Sign In
            </button>
          </form>

          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors justify-center mt-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24 max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
      {/* Dashboard header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-subtle pb-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-primary uppercase tracking-[0.2em]">Operational Dashboard</span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
            System Overview & Metrics
          </h1>
        </div>

        {/* Studio quick launch */}
        <a
          href="/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-text-inverse hover:bg-primary/95 text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
        >
          <Database className="w-4 h-4" />
          <span>Launch CMS Studio</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-bg-secondary border border-border p-6 rounded-lg shadow-card">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span className="text-[10px] tracking-wider uppercase font-mono">Unique Visitors</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary">1,960</span>
          <p className="text-[9px] text-tertiary font-mono mt-1">+12.4% vs last week</p>
        </div>

        <div className="bg-bg-secondary border border-border p-6 rounded-lg shadow-card">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span className="text-[10px] tracking-wider uppercase font-mono">Page Views</span>
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary">4,280</span>
          <p className="text-[9px] text-tertiary font-mono mt-1">+8.1% vs last week</p>
        </div>

        <div className="bg-bg-secondary border border-border p-6 rounded-lg shadow-card">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span className="text-[10px] tracking-wider uppercase font-mono">Resume Downloads</span>
            <Download className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary">167</span>
          <p className="text-[9px] text-tertiary font-mono mt-1">+35% downloads increase</p>
        </div>

        <div className="bg-bg-secondary border border-border p-6 rounded-lg shadow-card">
          <div className="flex items-center justify-between text-text-muted mb-2">
            <span className="text-[10px] tracking-wider uppercase font-mono">Submissions</span>
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary">24</span>
          <p className="text-[9px] text-text-muted font-mono mt-1">98% response rating</p>
        </div>
      </div>

      {/* Traffic analysis Line Chart using Recharts */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 shadow-card flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <h2 className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>Traffic Overview (Last 7 Days)</span>
          </h2>
          <span className="text-[10px] text-text-muted font-mono">Visitor volume trends</span>
        </div>

        <div className="w-full h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="day" stroke="#888" fontSize={11} fontClassName="font-mono" />
              <YAxis stroke="#888" fontSize={11} fontClassName="font-mono" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#121214",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-outfit)"
                }}
              />
              <Line type="monotone" dataKey="visitors" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="downloads" stroke="var(--secondary)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row: Submissions and Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Submissions (7 cols) */}
        <div className="lg:col-span-7 bg-bg-secondary border border-border rounded-lg p-6 shadow-card flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-text-primary border-b border-border-subtle pb-4">
            Recent Contact Messages
          </h2>

          <div className="flex flex-col gap-4">
            {mockSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 bg-bg-primary rounded border border-border-subtle flex flex-col gap-2">
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-bold text-sm text-text-primary">{sub.name} <span className="text-[10px] font-normal text-text-muted">({sub.email})</span></span>
                  <span className="font-mono text-[9px] text-text-muted">{sub.date}</span>
                </div>
                <span className="text-[10px] text-primary font-mono tracking-wider">{sub.subject}</span>
                <p className="text-xs text-text-secondary leading-relaxed bg-bg-secondary p-3 rounded mt-1 border border-border-subtle">
                  {sub.msg}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Downloads Log (5 cols) */}
        <div className="lg:col-span-5 bg-bg-secondary border border-border rounded-lg p-6 shadow-card flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-text-primary border-b border-border-subtle pb-4">
            Tracked Resume Downloads
          </h2>

          <div className="flex flex-col gap-3">
            {mockDownloads.map((dl, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded bg-bg-primary border border-border-subtle text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono font-bold text-text-primary">{dl.ip}</span>
                  <span className="text-[10px] text-text-muted">{dl.region} · {dl.agent}</span>
                </div>
                <span className="font-mono text-[9px] text-text-muted shrink-0">{dl.date.split(" ")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

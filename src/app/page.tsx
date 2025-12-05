'use client';

import { Github, Mail, MessageSquare, Key, ArrowRight, Music, GitBranch, FileText, Home as HomeIcon, BookOpen, Mail as MailIcon, Archive, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initialize visitor count
    const currentCount = localStorage.getItem('visitorCount');
    if (currentCount) {
      setVisitorCount(parseInt(currentCount));
    } else {
      localStorage.setItem('visitorCount', '1');
      setVisitorCount(1);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const incrementVisitor = () => {
    const newCount = visitorCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('visitorCount', newCount.toString());
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + 'st';
    if (j === 2 && k !== 12) return num + 'nd';
    if (j === 3 && k !== 13) return num + 'rd';
    return num + 'th';
  };

  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 theme-transition">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm font-mono">heysomting.by</div>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary rounded-lg theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="pixelated-text mb-8">hey, i'm somting</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            cybersecurity student && college freshman. passionate about breaking things to understand how they work.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a href="https://github.com" className="px-6 py-3 border border-border hover:border-foreground hover:bg-secondary button-hover flex items-center gap-2 text-sm">
              <Github size={18} />
              github
            </a>
            <a href="mailto:hi@heysomting.by" className="px-6 py-3 border border-border hover:border-foreground hover:bg-secondary button-hover flex items-center gap-2 text-sm">
              <Mail size={18} />
              email
            </a>
            <a href="#" className="px-6 py-3 border border-border hover:border-foreground hover:bg-secondary button-hover flex items-center gap-2 text-sm">
              <MessageSquare size={18} />
              discord
            </a>
            <a href="/pgp.txt" className="px-6 py-3 border border-border hover:border-foreground hover:bg-secondary button-hover flex items-center gap-2 text-sm">
              <Key size={18} />
              pgp key
            </a>
          </div>

          {/* Blog CTA */}
          <a href="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:opacity-90 button-hover glow-on-hover">
            read my blog
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {/* Scrobbled Card */}
          <div className="border border-border p-6 hover:border-foreground card-hover">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              <Music size={16} />
              scrobbled
            </div>
            <h3 className="text-xl font-bold mb-2">scary all over</h3>
            <p className="text-sm text-muted-foreground mb-4">by yerbby dj</p>
            <a href="https://www.last.fm" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 button-hover inline-flex">
              via last.fm
              <ArrowRight size={12} />
            </a>
          </div>

          {/* Last Commit Card */}
          <div className="border border-border p-6 hover:border-foreground card-hover">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              <GitBranch size={16} />
              last commit
            </div>
            <h3 className="text-xl font-bold mb-2">pushed to main</h3>
            <p className="text-sm text-muted-foreground mb-2">iamnotsomting/netbird-traefik • main</p>
            <p className="text-xs text-muted-foreground">15d ago</p>
          </div>

          {/* Latest Post Card */}
          <div className="border border-border p-6 hover:border-foreground card-hover">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              <FileText size={16} />
              latest post
            </div>
            <h3 className="text-lg font-bold mb-2">Setting Up Cowrie Honeypot w/ Grafana Monitoring</h3>
            <p className="text-sm text-muted-foreground mb-2">Step-by-step guide to setting up Cowrie honeypot a...</p>
            <p className="text-xs text-muted-foreground">2 months ago</p>
          </div>
        </div>

        {/* Visitor Counter */}
        <div className="text-center mt-20 pt-8 border-t border-border theme-transition">
          <p className="text-sm text-muted-foreground mb-4">
            you are currently the <span className="text-foreground font-bold counter-animate">{getOrdinalSuffix(visitorCount)}</span> visitor!
          </p>
          <button
            onClick={incrementVisitor}
            className="px-6 py-2 border border-border hover:border-foreground hover:bg-secondary button-hover text-sm"
          >
            I visited! Click to count
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 theme-transition">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-8">
            <a href="/" className="p-3 hover:bg-secondary rounded-lg button-hover">
              <HomeIcon size={20} />
            </a>
            <a href="/blog" className="p-3 hover:bg-secondary rounded-lg button-hover">
              <BookOpen size={20} />
            </a>
            <a href="/guestbook" className="p-3 hover:bg-secondary rounded-lg button-hover">
              <MailIcon size={20} />
            </a>
            <a href="/archives" className="p-3 hover:bg-secondary rounded-lg button-hover">
              <Archive size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

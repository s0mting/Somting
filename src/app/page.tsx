import Link from "next/link";
import { 
  BookOpen, 
  Archive, 
  NotebookPen, 
  Github, 
  Music,
  Mail,
  MessageSquare,
  Key
} from "lucide-react";

// --- Types ---
interface GithubEvent {
  id: string;
  type: string;
  actor: { login: string; avatar_url: string };
  repo: { name: string; url: string };
  payload: { commits?: Array<{ message: string; sha: string }> };
  created_at: string;
}

// --- Server Action: Fetch GitHub ---
async function getLatestCommits() {
  try {
    const res = await fetch("https://api.github.com/users/FLAX9875/events/public", {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub API error`);
    
    const events: GithubEvent[] = await res.json();
    
    return events
      .filter((e) => e.type === "PushEvent" && e.payload.commits)
      .flatMap((e) => 
        e.payload.commits!.map((commit) => ({
          id: commit.sha,
          repo: e.repo.name.replace("FLAX9875/", ""),
          message: commit.message,
          date: e.created_at,
        }))
      )
      .slice(0, 5); // Keep top 5 for cleanliness
  } catch (error) {
    return [];
  }
}

function formatTimeAgo(dateString: string) {
  const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default async function Home() {
  const commits = await getLatestCommits();

  return (
    <main className="min-h-screen bg-black text-gray-200 font-sans pb-32 selection:bg-purple-500/30">
      
      {/* --- Header / Hero --- */}
      <div className="max-w-2xl mx-auto px-6 pt-20">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
          heysomting
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          Cybersecurity student & college freshman. Passionate about breaking things to understand how they work.
        </p>

        {/* Social Links (Restored) */}
        <div className="flex flex-wrap gap-3 mb-12">
          <SocialBadge href="https://github.com/FLAX9875" icon={<Github size={14}/>} label="GitHub" />
          <SocialBadge href="mailto:hi@heysomting.by" icon={<Mail size={14}/>} label="Email" />
          <SocialBadge href="#" icon={<MessageSquare size={14}/>} label="Discord" />
          <SocialBadge href="/pgp.txt" icon={<Key size={14}/>} label="PGP Key" />
        </div>
      </div>

      {/* --- Grid Layout for Content --- */}
      <div className="max-w-2xl mx-auto px-6 grid gap-6">
        
        {/* Restored Music Card */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-2 text-xs text-purple-400 uppercase tracking-widest font-bold mb-4">
            <Music size={14} />
            Scrobbled
          </div>
          <h3 className="text-xl font-bold text-white">scary all over</h3>
          <p className="text-gray-400 text-sm">by yerbby dj</p>
        </div>

        {/* GitHub Feed */}
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-2 text-xs text-green-400 uppercase tracking-widest font-bold mb-6">
            <Github size={14} />
            Latest Activity
          </div>
          
          <div className="space-y-6">
            {commits.map((commit) => (
              <div key={commit.id} className="relative pl-4 border-l border-gray-700">
                 <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{commit.repo}</span>
                    <span className="text-xs text-gray-500">{formatTimeAgo(commit.date)}</span>
                 </div>
                 <p className="text-sm text-gray-400 font-mono truncate">{commit.message}</p>
              </div>
            ))}
            {commits.length === 0 && <p className="text-gray-500 text-sm">No recent activity.</p>}
          </div>
        </div>

      </div>

      {/* --- The Dock --- */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-[#111]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
          <DockLink href="/blog" label="Blog" icon={<BookOpen size={20} />} />
          <div className="w-px h-8 bg-white/10 mx-1" />
          <DockLink href="/guestbook" label="Guestbook" icon={<NotebookPen size={20} />} />
          <div className="w-px h-8 bg-white/10 mx-1" />
          <DockLink href="/archives" label="Archives" icon={<Archive size={20} />} />
        </div>
      </div>
    </main>
  );
}

// --- Small Helper Components ---

function SocialBadge({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 text-xs text-gray-400 hover:text-white hover:border-gray-600 transition-all">
      {icon} {label}
    </a>
  );
}

function DockLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="group relative flex items-center justify-center p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95">
      {icon}
      <span className="absolute -top-12 opacity-0 transform translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 text-white text-xs font-medium py-1.5 px-3 rounded-lg border border-gray-700 whitespace-nowrap shadow-xl">
        {label}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 border-r border-b border-gray-700"></span>
      </span>
    </Link>
  );
}

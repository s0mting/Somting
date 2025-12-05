'use client';

import { Archive, Folder } from 'lucide-react';
import Link from 'next/link';

const collections = [
  {
    name: "projects",
    path: "/archives/projects",
    description: "My personal projects and experiments"
  },
  {
    name: "resources",
    path: "/archives/resources",
    description: "Useful tools and resources"
  },
  {
    name: "gallery",
    path: "/archives/gallery",
    description: "Photos and visual content"
  }
];

export default function ArchivesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <Archive size={20} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight pixelated-text" style={{ fontSize: '1.5rem', letterSpacing: '0.1rem' }}>
                archives
              </h1>
              <p className="text-muted-foreground text-sm">browse through my collections</p>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-10">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={collection.path}
              className="group flex flex-col items-center cursor-pointer space-y-2 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="transition-transform group-hover:scale-110 duration-300">
                <Folder size={70} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {collection.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            More collections coming soon...
          </p>
        </div>
      </main>
    </div>
  );
}

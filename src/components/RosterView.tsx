import React, { useState, useEffect } from 'react';
import { getAssociates } from '../firebase';

interface Associate {
  name: string;
  focus: string;
  location: string;
  style: string;
  languages: string;
  traits: string;
  bio: string;
  quirks?: string;
}

export function RosterView({ openDossier, view }: { openDossier: (associate: any) => void, view: string }) {
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [isLoadingRoster, setIsLoadingRoster] = useState(false);

  useEffect(() => {
    if (view === 'roster' && associates.length === 0) {
      setIsLoadingRoster(true);
      
      getAssociates().then(data => {
        setAssociates(data as Associate[]);
        setTimeout(() => {
          setIsLoadingRoster(false);
        }, 1200); // Artificial delay to keep the aesthetic
      }).catch(err => {
        console.error("Failed to decrypt roster elements", err);
        setIsLoadingRoster(false);
      });
    }
  }, [view, associates.length]);

  return (
    <div className="view-section active pt-12 min-h-screen px-6 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-white mb-4">The Roster</h2>
          <p className="text-neutral-500 text-sm tracking-widest uppercase">Verified Associates</p>
          <div className="h-px w-24 bg-luxury-gold mx-auto mt-8"></div>
        </div>

        {isLoadingRoster ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-8 fade-in">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-t-2 border-luxury-gold rounded-full animate-spin opacity-80" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-2 border-b-2 border-white rounded-full animate-spin opacity-50" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-4 bg-luxury-dark/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-luxury-gold text-xs font-mono uppercase tracking-[0.3em] opacity-80">Decrypting Assets</p>
              <p className="text-neutral-600 text-[10px] uppercase font-serif tracking-widest">Establishing Secure Connection...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {associates.map((associate, id) => (
              <div key={id} onClick={() => openDossier(associate)} className="border border-neutral-800 bg-luxury-dark/50 group overflow-hidden cursor-pointer hover:border-luxury-gold/50 transition duration-500">
                <div className="h-64 bg-black flex items-center justify-center relative overflow-hidden" style={{ background: associate.style?.replace('background-image: ', '') }}>
                  <div className="absolute inset-0 bg-neutral-900 opacity-20 block group-hover:scale-110 transition duration-1000 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-0"></div>
                  <span className="text-neutral-500 font-serif tracking-widest text-xs z-10 opacity-70 border border-neutral-700/50 px-4 py-2 bg-black/40 backdrop-blur-[2px]">CLASSIFIED ASSET</span>
                </div>
                <div className="p-6 relative z-10 bg-luxury-black">
                  <h3 className="text-2xl font-serif text-luxury-gold mb-1">{associate.name}</h3>
                  <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">{associate.location}</p>
                  <p className="text-neutral-400 text-sm font-light border-t border-neutral-800 pt-4">
                    Specialization: <span className="text-white">{associate.focus}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

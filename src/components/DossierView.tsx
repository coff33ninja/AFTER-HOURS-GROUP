import React from 'react';

export function DossierView({ selectedAssociate, setView }: { selectedAssociate: any, setView: (view: any) => void }) {
  if (!selectedAssociate) return null;

  return (
    <div className="view-section active min-h-screen fade-in -mt-20">
      {/* Dossier Header banner */}
      <div className="h-96 w-full relative flex items-end pb-12 px-6 lg:px-24" style={{ background: selectedAssociate.style?.replace('background-image: ', '') || '#000' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/80 to-transparent"></div>
        <div className="absolute top-28 left-6 lg:left-24">
          <button onClick={() => setView('roster')} className="text-neutral-500 hover:text-luxury-gold text-xs uppercase tracking-widest transition flex items-center space-x-2">
            <span>←</span> <span>Return to Roster</span>
          </button>
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 px-3 py-1 text-[10px] uppercase tracking-widest">Active Status</span>
            <span className="text-neutral-500 text-xs uppercase tracking-widest font-mono">ID: {selectedAssociate.name.toUpperCase()}-09{Math.floor(Math.random() * 99)}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-2">{selectedAssociate.name}</h1>
          <p className="text-xl text-luxury-gold tracking-widest uppercase opacity-80">{selectedAssociate.location}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6 border-b border-neutral-800 pb-4">Executive Summary</h3>
            <p className="text-neutral-300 text-lg leading-relaxed font-light">
              {selectedAssociate.bio}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6 border-b border-neutral-800 pb-4">Engagement Dynamics</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Primary Directive</p>
                <p className="text-white font-serif text-lg">{selectedAssociate.focus}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Psychological Array</p>
                <p className="text-white font-serif text-lg">{selectedAssociate.traits}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Linguistic Capabilities</p>
                <p className="text-white font-serif text-lg">{selectedAssociate.languages}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 relative">
          <div className="border border-luxury-gold/20 bg-luxury-dark/50 p-8 sticky top-32">
            <h3 className="text-2xl font-serif text-white mb-6">Initiate Protocol</h3>
            <p className="text-neutral-400 text-sm mb-8 font-light">
              Secure an engagement window with {selectedAssociate.name}. Subject to immediate availability verification and retainer clearance.
            </p>
            <button className="w-full bg-luxury-gold text-black uppercase tracking-[0.2em] py-4 text-xs font-bold hover:bg-white transition duration-300 mb-4">
              Send Inquiry
            </button>
            <p className="text-center text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
              Encrypted via AHG Networks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

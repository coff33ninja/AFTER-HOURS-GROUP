import React from 'react';

export function Navigation({
  view,
  handleNavClick,
  isAuthenticated,
  handleLogout
}: any) {
  return (
    <nav className="fixed w-full z-40 top-0 bg-luxury-black/80 backdrop-blur-md border-b border-luxury-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-serif tracking-widest text-white uppercase cursor-pointer" onClick={() => handleNavClick('home')}>
          A<span className="text-luxury-gold">H</span>G
        </div>

        <div className="hidden md:flex space-x-8 text-xs tracking-[0.2em] uppercase text-neutral-400">
          <button onClick={() => handleNavClick('home')} className={`hover:text-luxury-gold transition duration-300 ${view === 'home' ? 'text-luxury-gold' : ''}`}>The Firm</button>
          <button onClick={() => handleNavClick('advisory')} className={`hover:text-luxury-gold transition duration-300 ${view === 'advisory' ? 'text-luxury-gold' : ''}`}>Advisory</button>
          <button onClick={() => handleNavClick('protocols')} className={`hover:text-luxury-gold transition duration-300 ${view === 'protocols' ? 'text-luxury-gold' : ''}`}>Protocols</button>
          <button onClick={() => handleNavClick('roster')} className={`hover:text-luxury-gold transition duration-300 ${(view === 'roster' || view === 'dossier') ? 'text-luxury-gold' : ''}`}>The Roster</button>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => handleNavClick('roster')} className="text-xs tracking-[0.2em] uppercase border border-luxury-gold text-luxury-gold px-6 py-2 hover:bg-luxury-gold hover:text-black transition duration-300">
            {isAuthenticated ? 'Secured Access' : 'Client Portal'}
          </button>
          {isAuthenticated && (
            <button onClick={handleLogout} className="text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-luxury-gold transition duration-300">
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

import React from 'react';

export function HomeView({ handleNavClick, isAuthenticated }: { handleNavClick: (view: any) => void, isAuthenticated: boolean }) {
  return (
    <div className="view-section active">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-dark via-luxury-black to-black -z-10"></div>
        <div className="max-w-3xl fade-in z-10" style={{ animationDelay: '0.2s' }}>
          <p className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-6">Elite Intimacy Management</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            <span className="gold-gradient-text">AFTER HOURS</span> <br />GROUP
          </h1>
          <p className="text-lg md:text-xl font-light text-neutral-400 mb-12 tracking-wide max-w-2xl mx-auto">
            Unseen. Unheard. Uninhibited.<br />Curated presence engineered to feel real—long after it ends.
          </p>
          <button onClick={() => handleNavClick('roster')} className="bg-transparent border border-white text-white px-10 py-4 uppercase tracking-[0.2em] text-sm hover:border-luxury-gold hover:text-luxury-gold transition duration-500">
            {isAuthenticated ? 'View Roster' : 'Secure Access'}
          </button>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-luxury-dark border-t border-b border-luxury-gold/5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-white mb-8">The Discretion Protocol</h2>
          <div className="h-px w-24 bg-luxury-gold mx-auto mb-8"></div>
          <p className="text-neutral-400 leading-relaxed font-light text-lg">
            We operate on a strictly invite-only basis. Our agency bridges the gap between high-society presence and absolute private indulgence. Every associate in our network is thoroughly vetted, health-screened, and bound by ironclad Non-Disclosure Agreements. We do not advertise. We do not accept public applications. We only accept referrals.
          </p>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-24 bg-luxury-black px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-white mb-4">Engagement Architecture</h2>
            <p className="text-neutral-500 text-sm tracking-widest uppercase">Select Offerings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="border border-luxury-gold/20 p-8 hover:border-luxury-gold/60 transition duration-500 group">
              <h3 className="text-xl font-serif text-luxury-gold mb-4">The Velvet Tier</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Short-term, intensive private engagements. Guaranteed physical chemistry matching for discrete hotel outcalls.
              </p>
              <div className="text-xs tracking-widest text-neutral-600 group-hover:text-luxury-gold transition duration-300">REQUEST ACCESS</div>
            </div>
            {/* Tier 2 */}
            <div className="border border-luxury-gold/20 p-8 hover:border-luxury-gold/60 transition duration-500 group">
              <h3 className="text-xl font-serif text-luxury-gold mb-4">The Midnight Protocol</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Uninterrupted overnight access. Deep immersion and tailored role-dynamics without the pressure of the clock.
              </p>
              <div className="text-xs tracking-widest text-neutral-600 group-hover:text-luxury-gold transition duration-300">REQUEST ACCESS</div>
            </div>
            {/* Tier 3 */}
            <div className="border border-luxury-gold/20 p-8 hover:border-luxury-gold/60 transition duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-luxury-gold text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">NDA Required</div>
              <h3 className="text-xl font-serif text-luxury-gold mb-4">The Sovereign</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                48 hours of unrestricted access. Dual-companion options and bespoke accommodation for absolute sensory indulgence.
              </p>
              <div className="text-xs tracking-widest text-neutral-600 group-hover:text-luxury-gold transition duration-300">REQUEST ACCESS</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

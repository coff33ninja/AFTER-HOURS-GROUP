import React from 'react';

export function ProtocolsView({ handleNavClick }: { handleNavClick: (view: any) => void }) {
  return (
    <div className="view-section active pt-12 min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-white mb-4">Client Protocols</h2>
          <p className="text-neutral-500 text-sm tracking-widest uppercase">Terms of Engagement</p>
          <div className="h-px w-24 bg-luxury-gold mx-auto mt-8"></div>
        </div>

        <div className="space-y-12">
          <div className="border-l border-luxury-gold/30 pl-6">
            <h3 className="text-xl font-serif text-luxury-gold mb-3">01. Absolute Discretion</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              All prospective clients must undergo a preliminary background screen to ensure alignment with our discretion standards. Photography, recording, or digital documentation of any engagement is strictly prohibited and enforced via legally binding Non-Disclosure Agreements.
            </p>
          </div>

          <div className="border-l border-luxury-gold/30 pl-6">
            <h3 className="text-xl font-serif text-luxury-gold mb-3">02. Associate Autonomy & Limitations</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              While we facilitate ultimate indulgence, our associates maintain absolute autonomy regarding stamina limits, specific physical parameters, and fetish accommodations. Boundaries established by the associate prior to the engagement are non-negotiable.
            </p>
          </div>

          <div className="border-l border-luxury-gold/30 pl-6">
            <h3 className="text-xl font-serif text-luxury-gold mb-3">03. Financial Routing</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              To maintain the integrity of our clients' private affairs, engagements are billed exclusively through our offshore advisory holding entity. We accept wire transfers, select cryptocurrencies, and anonymous corporate accounts. No transaction history will ever reflect intimacy or companion services.
            </p>
          </div>
          
          <div className="text-center mt-16 mb-8">
            <p className="text-luxury-gold italic font-serif text-xl opacity-90">“Most clients arrive curious. Very few leave unaffected.”</p>
          </div>

          <div className="text-center pt-8">
            <button onClick={() => handleNavClick('roster')} className="bg-transparent border border-luxury-gold text-luxury-gold px-10 py-4 uppercase tracking-[0.2em] text-sm hover:bg-luxury-gold hover:text-black transition duration-500">
              Acknowledge & Access Roster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export function AdvisoryView() {
  return (
    <div className="view-section active pt-12 min-h-screen px-6 fade-in">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-serif text-white mb-4">Advisory Board</h2>
        <p className="text-neutral-500 text-sm tracking-widest uppercase">The Architects of Discretion</p>
        <div className="h-px w-24 bg-luxury-gold mx-auto mt-8"></div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h3 className="text-2xl font-serif text-luxury-gold">Origins</h3>
          <p className="text-neutral-400 leading-relaxed font-light">
            Founded in 2018 under an entirely different moniker, the After Hours Group was established by former private wealth managers who recognized a critical void in the luxury service continuum: absolute, unconditional intimacy without the prevailing risks of public exposure.
          </p>
          <p className="text-neutral-400 leading-relaxed font-light">
            Operating outside the purview of standard agencies, we curate experiences rather than merely facilitating them. The Advisory Board comprises anonymous industry veterans across hospitality, psychological profiling, and high-level security.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-serif text-luxury-gold">The Selection Process</h3>
          <p className="text-neutral-400 leading-relaxed font-light">
            Our associates are not recruited; they are identified. Fewer than 1% of independent candidates pass our preliminary vetting. Our criteria extend far beyond the physical—we evaluate emotional intelligence, conversational agility across five verticals (art, finance, politics, tech, philanthropy), and innate psychological resilience.
          </p>
          <div className="p-6 border border-luxury-gold/20 bg-luxury-dark/30 mt-8">
            <p className="text-neutral-300 text-sm italic font-serif">
              "We do not sell time. We engineer a profound, temporary reality designed to linger long after the NDA is signed."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { therapistInfo, credentialsData } from '../data/mockData';
import { ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';

export const About: React.FC = () => {
  const hasBio = therapistInfo.bioDetailed.trim().length > 0;
  const hasPhilosophy = therapistInfo.philosophy.trim().length > 0;
  const hasCredentials = credentialsData.length > 0;

  return (
    <section id="about" className="py-24 bg-brand-cream border-t border-brand-charcoal/5">
      <div className="max-w-3xl mx-auto px-6 md:px-12 flex flex-col items-start text-left space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            About
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal text-balance leading-tight">
            A gentle space for self-discovery, growth, and integration.
          </h2>
        </div>

        {hasBio && (
          <p className="font-sans text-base text-brand-charcoal-muted leading-relaxed text-balance">
            {therapistInfo.bioDetailed}
          </p>
        )}

        {hasPhilosophy && (
          <div className="relative border-l-2 border-brand-sage pl-6 py-1 my-4 w-full">
            <p className="font-serif text-lg md:text-xl italic text-brand-charcoal leading-relaxed text-balance">
              &ldquo;{therapistInfo.philosophy}&rdquo;
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3 p-4 rounded-xl bg-brand-linen/40 border border-brand-stone/20 w-full sm:w-auto">
          <ShieldCheck size={18} className="text-brand-sage shrink-0" />
          <span className="text-xs font-sans font-semibold text-brand-charcoal">
            HIPAA & Legally Protected Sanctuary
          </span>
        </div>

        {hasCredentials && (
          <div className="bg-brand-linen/50 border border-brand-stone/30 rounded-2xl p-6 space-y-4 w-full">
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-brand-charcoal-muted">
              Core Credentials
            </h4>
            <div className="space-y-3">
              {credentialsData.slice(0, 3).map((cred, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-left">
                  <span className="text-xs font-sans font-bold text-brand-sage-dark bg-brand-cream border border-brand-stone/30 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                    {cred.year}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-sans font-semibold text-brand-charcoal leading-snug">
                      {cred.title}
                    </span>
                    <span className="text-[10px] font-sans text-brand-charcoal-muted leading-tight">
                      {cred.institution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button variant="primary" size="lg" to="/about">
            Read Full Story
          </Button>
        </div>
      </div>
    </section>
  );
};

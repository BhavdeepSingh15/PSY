import React from 'react';
import { Button } from '../components/Button';
import { therapistInfo } from '../data/mockData';
import { MessageSquareHeart } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-brand-cream border-t border-brand-charcoal/5 relative overflow-hidden">
      {/* Visual Organic Calming Shape */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-sage-light/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-stone/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-brand-linen/70 border border-brand-stone/40 rounded-[32px] p-8 md:p-16 text-center space-y-8 shadow-glass relative">
          
          {/* Subtle Icon Ornament */}
          <div className="inline-flex p-4 rounded-full bg-brand-cream border border-brand-stone/30 text-brand-sage-dark shadow-xs mx-auto">
            <MessageSquareHeart size={24} strokeWidth={1.5} />
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal leading-tight text-balance">
              Ready to begin your healing journey?
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-charcoal-muted leading-relaxed text-balance">
              Taking the first step can feel overwhelming, but you do not have to carry the weight alone. Let us sit down for a complimentary consultation to clarify your needs and see if we make a supportive team.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <Button variant="primary" size="lg" to="/book-session" className="w-full sm:w-auto">
              Schedule Free Consult
            </Button>
            <Button variant="outline" size="lg" to={therapistInfo.email ? `mailto:${therapistInfo.email}` : '/book-session'} className="w-full sm:w-auto bg-brand-cream">
              Ask a Question
            </Button>
          </div>

          {/* Quick info footer */}
          <div className="text-[11px] font-sans tracking-widest uppercase text-brand-charcoal-muted/50 pt-2">
            No Commitment Required • 100% Confidential
          </div>

        </div>
      </div>
    </section>
  );
};

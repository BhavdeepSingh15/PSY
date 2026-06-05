import React from 'react';
import { pillarsData } from '../data/mockData';
import { Shield, HeartHandshake, Search, GraduationCap } from 'lucide-react';

const iconMap = {
  Shield,
  HeartHandshake,
  Search,
  GraduationCap,
};

export const WhyUs: React.FC = () => {
  return (
    <section className="py-24 bg-brand-cream border-t border-brand-charcoal/5 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-sage/5 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            Why Work With Me
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal text-balance leading-tight">
            A solid foundation built on ethics, science, and true human safety.
          </h2>
          <div className="w-12 h-[1px] bg-brand-sage mx-auto mt-6" />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
          {pillarsData.map((pillar) => {
            const IconComponent = iconMap[pillar.iconName] || Shield;
            return (
              <div
                key={pillar.id}
                className="flex items-start space-x-6 group"
              >
                {/* Icon Wrapper */}
                <div className="p-4 rounded-2xl bg-brand-linen/70 border border-brand-stone/30 text-brand-sage-dark group-hover:bg-brand-sage group-hover:text-brand-cream group-hover:border-transparent transition-all duration-500 shrink-0">
                  <IconComponent size={22} strokeWidth={1.8} />
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-charcoal group-hover:text-brand-sage-dark transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-brand-charcoal-muted leading-relaxed text-balance">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

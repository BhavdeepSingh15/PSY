import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { servicesData } from '../data/mockData';
import { Button } from '../components/Button';
import { Check, Heart, Activity, Users, Sparkles, Compass, Layers, ShieldCheck } from 'lucide-react';

const iconMap = {
  Heart,
  Activity,
  Users,
  Sparkles,
  Compass,
  Layers,
};

export const ServicesPage: React.FC = () => {
  const { hash } = useLocation();

  // Scroll to hash element if present on mount
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay scroll slightly to allow transitions to settle
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [hash]);

  return (
    <PageTransition>
      {/* Editorial Header */}
      <section className="pt-36 pb-20 bg-brand-linen/40 border-b border-brand-charcoal/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            Clinical Scope
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-charcoal text-balance">
            Therapy Offerings
          </h1>
          <p className="font-serif text-lg md:text-xl italic text-brand-charcoal-muted max-w-2xl mx-auto leading-relaxed text-balance">
            A comprehensive, patient-centered breakdown of specialty areas and treatment goals.
          </p>
        </div>
      </section>

      {/* Main Specializations Grid */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Heart;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-brand-charcoal/5 pb-20 last:border-none last:pb-0 scroll-mt-28`}
              >
                
                {/* Visual Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="bg-brand-linen/40 border border-brand-stone/30 rounded-[32px] p-8 md:p-10 space-y-8 shadow-premium text-left">
                    <div className="flex justify-between items-center">
                      <div className="p-4 bg-brand-cream border border-brand-stone/30 rounded-2xl text-brand-sage-dark">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-sage-dark bg-brand-sage-light px-3 py-1 rounded-full">
                        {service.category} Specialization
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs text-brand-charcoal-muted">HIPAA Secure Portal</span>
                        <span className="text-brand-sage flex items-center font-sans text-xs font-semibold">
                          <ShieldCheck size={12} className="mr-1" /> Yes
                        </span>
                      </div>
                    </div>

                    <Button variant="primary" size="md" to="/book-session" className="w-full text-center py-3">
                      Book This Specialization
                    </Button>
                  </div>
                </div>

                {/* Detail Narrative Column */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} text-left space-y-6`}>
                  <h3 className="font-serif text-3xl font-medium tracking-wide text-brand-charcoal">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-base text-brand-charcoal-muted leading-relaxed">
                    {service.longDescription}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-brand-charcoal-muted">
                      Expected Clinical Outcomes & Focus:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start space-x-3 text-xs md:text-sm text-brand-charcoal">
                          <span className="p-1 rounded-full bg-brand-sage-light text-brand-sage-dark mt-0.5 shrink-0">
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span className="leading-snug text-balance">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>
    </PageTransition>
  );
};

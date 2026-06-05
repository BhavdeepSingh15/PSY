import React from 'react';
import { servicesData } from '../data/mockData';
import { ServiceCard } from '../components/ServiceCard';
import { Button } from '../components/Button';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  // Show first 3 services on home page as standard editorial preview
  const previewServices = servicesData.slice(0, 3);

  return (
    <section id="services" className="py-24 bg-brand-linen/40 border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
              Areas of Specialization
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal text-balance leading-tight">
              Evidence-based therapy tailored for your unique healing path.
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-brand-charcoal-muted max-w-sm mt-4 md:mt-0 leading-relaxed text-balance">
            Every session offers a collaborative, focused container to soothe the nervous system and develop actionable, long-term tools for life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {previewServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Action Call */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            to="/services"
            className="group font-semibold uppercase tracking-wider text-xs"
          >
            <span>View All Clinical Specializations</span>
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </div>

      </div>
    </section>
  );
};

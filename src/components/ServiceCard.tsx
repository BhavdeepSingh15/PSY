import React from 'react';
import { ArrowRight, Heart, Activity, Users, Sparkles, Compass, Layers } from 'lucide-react';
import type { Service } from '../data/mockData';
import { Button } from './Button';

interface ServiceCardProps {
  service: Service;
}

const iconMap = {
  Heart,
  Activity,
  Users,
  Sparkles,
  Compass,
  Layers,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Heart;

  return (
    <div
      className="group relative bg-brand-cream border border-brand-charcoal/5 rounded-2xl p-8 hover:bg-brand-linen/30 hover:border-brand-sage/20 transition-all duration-500 shadow-premium hover:shadow-glass flex flex-col justify-between min-h-[350px]"
    >
      <div>
        {/* Card Header & Icon */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3.5 rounded-xl bg-brand-sage-light text-brand-sage-dark group-hover:bg-brand-sage group-hover:text-brand-cream transition-all duration-500">
            <IconComponent size={20} strokeWidth={1.8} />
          </div>
          <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-brand-charcoal-muted/60 bg-brand-stone/20 px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-medium tracking-wide text-brand-charcoal mb-3 group-hover:text-brand-sage-dark transition-colors duration-300">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="font-sans text-sm text-brand-charcoal-muted leading-relaxed mb-8">
          {service.shortDescription}
        </p>
      </div>

      {/*Card Footer Details*/}
      <div className="border-t border-brand-charcoal/5 pt-6 mt-auto">
        <Button
          variant="outline"
          size="sm"
          to={`/services#${service.id}`}
          className="w-full justify-center group/btn text-xs font-semibold uppercase tracking-wider py-2.5"
        >
          <span>Learn More</span>
          <ArrowRight size={13} className="ml-2 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};

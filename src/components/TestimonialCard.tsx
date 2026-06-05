import React from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '../data/mockData';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-brand-cream border border-brand-charcoal/5 rounded-2xl p-8 md:p-10 shadow-premium flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-glass">
      
      {/* Decorative Quote Mark */}
      <div className="absolute -top-4 -right-2 text-brand-stone/10 font-serif text-[120px] select-none pointer-events-none font-bold">
        “
      </div>

      <div className="space-y-6">
        {/* Rating UI */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={`${
                i < testimonial.rating
                  ? 'fill-brand-gold text-brand-gold'
                  : 'text-brand-stone fill-brand-stone/30'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="font-serif text-lg leading-relaxed text-brand-charcoal/90 italic text-balance">
          "{testimonial.text}"
        </p>
      </div>

      {/* Author Details */}
      <div className="border-t border-brand-charcoal/5 pt-6 mt-8 flex justify-between items-center">
        <div>
          <h4 className="font-sans text-sm font-semibold tracking-wide text-brand-charcoal">
            {testimonial.name}
          </h4>
          <span className="text-xs font-sans text-brand-charcoal-muted/70">
            {testimonial.role}
          </span>
        </div>
        <span className="text-[10px] font-sans tracking-wider uppercase text-brand-charcoal-muted/40">
          {testimonial.date}
        </span>
      </div>

    </div>
  );
};

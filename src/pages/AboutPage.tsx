import React from 'react';
import { PageTransition } from '../components/PageTransition';
import {
  therapistInfo,
  credentialsData,
  approachesData,
  clinicalInfoData,
} from '../data/mockData';
import { Button } from '../components/Button';
import { Heart, Brain, Sparkles, BookOpen } from 'lucide-react';

const approachIconMap = {
  Heart,
  Brain,
  Sparkles,
};

export const AboutPage: React.FC = () => {
  const pageTitle = therapistInfo.name
    ? `About ${therapistInfo.name}`
    : 'About';

  return (
    <PageTransition>
      <section className="pt-36 pb-20 bg-brand-linen/40 border-b border-brand-charcoal/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            Our Practitioner
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-charcoal text-balance">
            {pageTitle}
          </h1>
          {therapistInfo.aboutTagline && (
            <p className="font-serif text-lg md:text-xl italic text-brand-charcoal-muted max-w-2xl mx-auto leading-relaxed text-balance">
              &ldquo;{therapistInfo.aboutTagline}&rdquo;
            </p>
          )}
          {therapistInfo.credentials && (
            <p className="font-sans text-xs tracking-widest uppercase text-brand-charcoal-muted">
              {therapistInfo.credentials}
            </p>
          )}
        </div>
      </section>

      <section className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-12 flex flex-col items-start text-left space-y-12">
          {clinicalInfoData.length > 0 && (
            <div className="w-full p-6 rounded-2xl bg-brand-linen/40 border border-brand-stone/30 flex flex-col space-y-4">
              <div className="flex items-center space-x-2 text-brand-sage-dark font-sans text-xs font-bold tracking-widest uppercase">
                <BookOpen size={14} />
                <span>Quick Clinical Info</span>
              </div>
              <ul className="space-y-2.5 font-sans text-xs text-brand-charcoal-muted leading-relaxed">
                {clinicalInfoData.map((item) => (
                  <li key={item.label}>
                    <strong className="text-brand-charcoal">{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {therapistInfo.bioDetailed && (
            <div className="space-y-6 w-full">
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-charcoal">
                Background
              </h3>
              <p className="font-sans text-sm md:text-base text-brand-charcoal-muted leading-relaxed whitespace-pre-line">
                {therapistInfo.bioDetailed}
              </p>
            </div>
          )}

          {therapistInfo.philosophy && (
            <div className="w-full border-l-2 border-brand-sage pl-6 py-1">
              <p className="font-serif text-lg md:text-xl italic text-brand-charcoal leading-relaxed">
                &ldquo;{therapistInfo.philosophy}&rdquo;
              </p>
            </div>
          )}

          {approachesData.length > 0 && (
            <div className="space-y-8 w-full border-t border-brand-charcoal/5 pt-10">
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-charcoal">
                Therapeutic Methodologies
              </h3>
              <div className="space-y-6">
                {approachesData.map((approach) => {
                  const Icon = approachIconMap[approach.iconName] || Heart;
                  return (
                    <div
                      key={approach.id}
                      className="flex items-start space-x-5 p-5 rounded-2xl bg-brand-linen/20 border border-brand-stone/10 hover:border-brand-sage/20 transition-all duration-300"
                    >
                      <div className="p-3 bg-brand-cream border border-brand-stone/30 rounded-xl text-brand-sage-dark shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-semibold text-brand-charcoal">
                          {approach.title}
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted leading-relaxed">
                          {approach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {credentialsData.length > 0 && (
            <div className="space-y-8 w-full border-t border-brand-charcoal/5 pt-10">
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-charcoal">
                Academic Background & Training
              </h3>
              <div className="relative border-l border-brand-stone/50 pl-6 space-y-8 text-left">
                {credentialsData.map((cred, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-brand-sage border border-brand-cream group-hover:scale-125 transition-transform duration-300" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans font-bold tracking-wider text-brand-sage-dark bg-brand-sage-light px-2.5 py-0.5 rounded-full">
                        {cred.year}
                      </span>
                      <h4 className="font-serif text-lg font-semibold text-brand-charcoal pt-1">
                        {cred.title}
                      </h4>
                      <p className="font-sans text-xs text-brand-charcoal-muted">
                        {cred.institution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full border-t border-brand-charcoal/5 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-medium text-brand-charcoal">
                Curious if we are a safe fit?
              </h4>
              <p className="font-sans text-xs text-brand-charcoal-muted">
                Let&apos;s begin with a pressure-free introductory chat.
              </p>
            </div>
            <Button variant="primary" size="md" to="/book-session">
              Schedule Call
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

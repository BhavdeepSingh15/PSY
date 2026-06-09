import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyCommitment: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="py-16 bg-brand-linen/30 border-t border-brand-charcoal/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-brand-cream border border-brand-stone/40 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8"
        >
          {/* Text and Title */}
          <div className="space-y-3 text-left max-w-xl">
            <div className="flex items-center space-x-2 text-brand-sage-dark">
              <Lock size={16} className="shrink-0" />
              <span className="text-xs font-sans font-semibold tracking-wider uppercase">
                Privacy & Confidentiality Commitment
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-brand-charcoal leading-snug">
              Your safety is our absolute foundation.
            </h3>
            <p className="font-sans text-sm md:text-base text-brand-charcoal-muted leading-relaxed text-balance">
              We protect your care with absolute privacy: sessions are conducted on fully encrypted, HIPAA-compliant platforms, and your therapeutic records are legally and ethically safeguarded.
            </p>
          </div>

          {/* Badges Column */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 justify-start sm:justify-center">
            <div className="flex items-center space-x-3 bg-brand-linen/60 border border-brand-stone/30 px-4 py-3 rounded-xl">
              <ShieldAlert size={18} className="text-brand-sage shrink-0" />
              <div className="text-left">
                <p className="text-xs font-sans font-bold text-brand-charcoal">HIPAA Compliant</p>
                <p className="text-[10px] font-sans text-brand-charcoal-muted">Encrypted video consulting</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-brand-linen/60 border border-brand-stone/30 px-4 py-3 rounded-xl">
              <CheckCircle2 size={18} className="text-brand-sage shrink-0" />
              <div className="text-left">
                <p className="text-xs font-sans font-bold text-brand-charcoal">Confidential Care</p>
                <p className="text-[10px] font-sans text-brand-charcoal-muted">Legally protected sessions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

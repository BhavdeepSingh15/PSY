import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { therapistInfo } from '../data/mockData';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-[85svh] pt-32 pb-16 md:py-24 flex items-center overflow-hidden bg-gradient-to-b from-brand-linen/60 via-brand-cream to-brand-cream">
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-sage-light/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-brand-stone/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-brand-sage/10 text-brand-sage-dark px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase"
          >
            <Sparkles size={12} className="fill-brand-sage-dark/10" />
            <span>Welcome to a Safe Space</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-charcoal text-balance leading-[1.1]"
          >
            Helping you navigate <span className="font-serif italic font-light text-brand-sage-dark">stress</span>, anxiety, and <span className="font-serif italic font-light text-brand-gold-dark">emotional wellbeing</span>.
          </motion.h1>

          {therapistInfo.bioShort && (
            <motion.p
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-brand-charcoal-muted leading-relaxed max-w-2xl text-balance"
            >
              {therapistInfo.bioShort}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            <Button variant="primary" size="lg" to="/book-session">
              Begin Your Journey
            </Button>
            <Button variant="secondary" size="lg" to="/services">
              Explore Offerings
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans tracking-wide text-brand-charcoal-muted/70"
          >
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sage mr-2" />
              HIPAA Compliant Virtual Space
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2" />
              1:1 Individualized Plans
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

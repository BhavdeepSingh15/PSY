import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Activity } from 'lucide-react';

const modalities = [
  {
    icon: <Brain className="w-5 h-5 text-brand-sage-dark" />,
    title: "Cognitive Behavioral Therapy (CBT)",
    desc: "Identify and restructure unhelpful thought patterns to directly change how you feel and react to stress."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-brand-sage-dark" />,
    title: "Mindfulness-Based Cognitive Therapy (MBCT)",
    desc: "Combine cognitive tools with present-moment awareness to observe negative thoughts without being overwhelmed."
  },
  {
    icon: <Activity className="w-5 h-5 text-brand-sage-dark" />,
    title: "Somatic Grounding Practices",
    desc: "Utilize body-based awareness to soothe an overactive nervous system and de-escalate anxiety in real time."
  }
];

export const ModalityOverview: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="modalities" className="py-24 bg-brand-linen/40 border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
              Scientific Approach
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal leading-tight">
              Evidence-based therapies built for lasting resilience.
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted max-w-sm mt-4 md:mt-0 leading-relaxed text-balance">
            We prioritize structured, proven clinical methodologies to help you identify thought triggers and manage stress biologically.
          </p>
        </div>

        {/* Modality Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {modalities.map((modality, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col space-y-4 p-6 bg-brand-cream border border-brand-stone/30 hover:border-brand-sage/20 rounded-2xl transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="p-3 bg-brand-linen/60 border border-brand-stone/40 text-brand-sage-dark rounded-xl w-fit group-hover:bg-brand-sage group-hover:text-brand-cream group-hover:border-transparent transition-all duration-300">
                {modality.icon}
              </div>
              
              {/* Content */}
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-semibold text-brand-charcoal group-hover:text-brand-sage-dark transition-colors duration-300">
                  {modality.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted leading-relaxed text-balance">
                  {modality.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

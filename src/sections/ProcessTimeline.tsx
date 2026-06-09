import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, HelpCircle, Milestone, Heart } from 'lucide-react';

const steps = [
  {
    icon: <Calendar className="w-5 h-5 text-brand-sage-dark" />,
    title: "1. Free Consultation",
    desc: "A brief, 15-minute call to discuss your goals and see if we are a natural clinical fit."
  },
  {
    icon: <HelpCircle className="w-5 h-5 text-brand-sage-dark" />,
    title: "2. The First Session",
    desc: "A gentle, pressure-free session to map out your background and align on your treatment goals."
  },
  {
    icon: <Milestone className="w-5 h-5 text-brand-sage-dark" />,
    title: "3. Active Skill Building",
    desc: "Ongoing sessions integrating proven therapies (CBT, MBCT) to build lasting resilience."
  },
  {
    icon: <Heart className="w-5 h-5 text-brand-sage-dark" />,
    title: "4. Graduation & Integration",
    desc: "As you build self-regulation skills, we slowly transition you out of therapy to thrive independently."
  }
];

export const ProcessTimeline: React.FC = () => {
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
    <section id="process" className="py-24 bg-brand-cream border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            How Therapy Works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal leading-tight">
            A clear, gentle roadmap for your healing journey.
          </h2>
          <div className="w-12 h-[1px] bg-brand-sage mx-auto mt-6" />
        </div>

        {/* Timeline Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col space-y-4 p-6 bg-brand-linen/20 border border-brand-stone/30 hover:border-brand-sage/30 rounded-2xl transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="p-3 bg-brand-linen/60 border border-brand-stone/40 text-brand-sage-dark rounded-xl w-fit group-hover:bg-brand-sage group-hover:text-brand-cream group-hover:border-transparent transition-all duration-300">
                {step.icon}
              </div>
              
              {/* Content */}
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-semibold text-brand-charcoal group-hover:text-brand-sage-dark transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted leading-relaxed text-balance">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

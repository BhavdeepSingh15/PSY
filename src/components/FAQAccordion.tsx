import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { FAQ } from '../data/mockData';

interface FAQAccordionProps {
  faq: FAQ;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-charcoal/10 py-5 first:pt-0 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 font-serif text-lg md:text-xl font-medium text-brand-charcoal hover:text-brand-sage transition-colors duration-300 focus:outline-none cursor-pointer group"
      >
        <span className="pr-4">{faq.question}</span>
        
        {/* Toggle Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`p-1.5 rounded-full ${
            isOpen
              ? 'bg-brand-sage text-brand-cream'
              : 'bg-brand-linen text-brand-charcoal-muted group-hover:bg-brand-stone/40'
          } transition-colors duration-300`}
        >
          <Plus size={16} strokeWidth={1.8} />
        </motion.div>
      </button>

      {/* Answer Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.05,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.2,
                },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-2 font-sans text-sm md:text-base leading-relaxed text-brand-charcoal-muted text-balance max-w-[90%]">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

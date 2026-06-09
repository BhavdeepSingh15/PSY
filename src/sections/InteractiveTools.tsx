import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Play, RotateCcw, CheckSquare, Square, Award } from 'lucide-react';

interface SelfCareItem {
  id: string;
  text: string;
  completed: boolean;
}

const DEFAULT_ITEMS: Omit<SelfCareItem, 'completed'>[] = [
  { id: '1', text: '5 minutes of slow, intentional box breathing' },
  { id: '2', text: 'Checked in on my stress levels without judgment' },
  { id: '3', text: 'Established one clear boundary for my personal time' },
  { id: '4', text: 'Drank water and stepped away from screens' },
  { id: '5', text: 'Wrote down one thing I am gratitude for' }
];

export const InteractiveTools: React.FC = () => {
  // --- Breathing Circle State & Logic ---
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Rest');
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    let timer: number | undefined;
    if (isActive) {
      timer = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setPhase((curr) => {
              switch (curr) {
                case 'Rest': return 'Inhale';
                case 'Inhale': return 'Hold';
                case 'Hold': return 'Exhale';
                case 'Exhale': return 'Rest';
                default: return 'Inhale';
              }
            });
            return 4; // Reset to 4s
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('Inhale');
    setSecondsLeft(4);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('Rest');
    setSecondsLeft(4);
  };

  // --- Self-Care Checklist State & Logic ---
  const [items, setItems] = useState<SelfCareItem[]>(() => {
    const saved = localStorage.getItem('selfcare_checklist');
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS.map(item => ({ ...item, completed: false }));
  });

  useEffect(() => {
    localStorage.setItem('selfcare_checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;

  return (
    <section id="interactive-tools" className="py-24 bg-brand-cream border-t border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            Daily Self-Regulation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-charcoal leading-tight">
            Find calm in this moment.
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted max-w-lg mx-auto leading-relaxed text-balance">
            Try these private, frontend-only tools to ground yourself right now. No data leaves your browser.
          </p>
          <div className="w-12 h-[1px] bg-brand-sage mx-auto mt-6" />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Card 1: Guided Breathing Circle */}
          <div className="flex flex-col items-center justify-between p-8 bg-brand-linen/25 border border-brand-stone/30 rounded-3xl shadow-premium text-center">
            <div className="w-full">
              <div className="flex justify-center mb-4 text-brand-sage-dark">
                <Wind className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-charcoal mb-2">Grounding Exercise</h3>
              <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted mb-8 max-w-sm mx-auto">
                Practice 4-second box breathing to immediately regulate your stress levels and calm your heart rate.
              </p>

              {/* Breathing Circle Container */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center mb-8">
                <motion.div
                  animate={{
                    scale: phase === 'Inhale' ? 1.35 : phase === 'Hold' ? 1.35 : 1.0,
                    opacity: phase === 'Hold' ? 0.8 : phase === 'Inhale' ? 0.7 : 0.4
                  }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="absolute inset-0 bg-brand-sage-light rounded-full filter blur-md border border-brand-sage/20"
                />
                <div className="z-10 bg-brand-cream rounded-full w-36 h-36 flex flex-col items-center justify-center border border-brand-stone/40 shadow-sm">
                  <span className="text-sm font-sans uppercase tracking-widest text-brand-charcoal-muted font-semibold">
                    {phase}
                  </span>
                  {isActive && (
                    <span className="text-xl font-serif text-brand-sage-dark mt-1 font-medium">
                      {secondsLeft}s
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 w-full">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-sage hover:bg-brand-sage-dark text-brand-cream rounded-xl shadow-sm transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" /> Start Exercise
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-charcoal-muted hover:bg-brand-charcoal text-brand-cream rounded-xl shadow-sm transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Self-Care Checklist */}
          <div className="flex flex-col justify-between p-8 bg-brand-linen/25 border border-brand-stone/30 rounded-3xl shadow-premium text-left">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-charcoal">Daily Self-Care Check</h3>
                <span className="text-[10px] font-sans font-bold px-2.5 py-1 bg-brand-sage/10 text-brand-sage-dark rounded-full shrink-0 border border-brand-sage/20 uppercase tracking-wider">
                  {completedCount} / {items.length} Done
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted mb-6">
                Check off these small actions of self-care to practice daily emotional resilience.
              </p>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="flex items-start gap-3 p-3 hover:bg-brand-cream/80 border border-transparent hover:border-brand-stone/30 rounded-xl cursor-pointer transition-all duration-300"
                  >
                    {item.completed ? (
                      <CheckSquare className="w-4.5 h-4.5 text-brand-sage shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4.5 h-4.5 text-brand-charcoal-muted/40 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs md:text-sm select-none transition-all duration-300 ${item.completed ? 'line-through text-brand-charcoal-muted/50' : 'text-brand-charcoal'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {completedCount === items.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-brand-sage-light border border-brand-sage/20 text-brand-sage-dark rounded-xl flex items-center gap-3 text-xs leading-relaxed"
              >
                <Award className="w-5 h-5 text-brand-sage shrink-0" />
                <span>Wonderful work. Taking time for small acts of self-care is a vital step toward long-term emotional resilience.</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

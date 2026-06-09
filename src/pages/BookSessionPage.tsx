import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { Button } from '../components/Button';
import { AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { submitConsultation } from '../services/consultationService';
import {
  getPublicSchedule,
  type ScheduleDay,
  type ScheduleSlotOccurrence,
} from '../services/slotService';

const THERAPY_TYPES = [
  'Anxiety Therapy',
  'Relationship Therapy',
  'Stress Management',
  'Teen Therapy',
  'Career Guidance',
];

const slotSelectionKey = (dayDate: string, slot: ScheduleSlotOccurrence) =>
  `${dayDate}|${slot.slotId}|${slot.startTime}`;

export const BookSessionPage: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [therapyType, setTherapyType] = useState(THERAPY_TYPES[0]);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [scheduleError, setScheduleError] = useState('');
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlotKey, setSelectedSlotKey] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    concern: '',
    additionalNotes: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState({
    fullDate: '',
    timeRange: '',
  });

  const visibleDays = useMemo(
    () => schedule.filter((day) => day.slots.length > 0),
    [schedule]
  );

  const currentDay = visibleDays[selectedDayIdx];
  const hasVisibleSlots = visibleDays.length > 0;
  const hasBookableSlot = visibleDays.some((day) => day.slots.some((slot) => !slot.isFull));

  const selectedSlot = useMemo(() => {
    if (!currentDay || !selectedSlotKey) return null;

    return (
      currentDay.slots.find(
        (slot) => slotSelectionKey(currentDay.date, slot) === selectedSlotKey
      ) ?? null
    );
  }, [currentDay, selectedSlotKey]);

  useEffect(() => {
    const loadSchedule = async () => {
      setScheduleLoading(true);
      setScheduleError('');

      try {
        const { schedule: data } = await getPublicSchedule();
        setSchedule(data);
        setSelectedDayIdx(0);
        setSelectedSlotKey('');
      } catch (error) {
        setScheduleError(
          error instanceof Error ? error.message : 'Failed to load available sessions'
        );
        setSchedule([]);
      } finally {
        setScheduleLoading(false);
      }
    };

    loadSchedule();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaySelect = (idx: number) => {
    setSelectedDayIdx(idx);
    setSelectedSlotKey('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    if (!hasBookableSlot || !currentDay || !selectedSlot) {
      setErrorMsg('Please select an available time slot before submitting.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.concern.trim() || !formData.age) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await submitConsultation(token, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        therapyType,
        age: Number(formData.age),
        phone: formData.phone.trim(),
        concern: formData.concern.trim(),
        additionalNotes: formData.additionalNotes.trim(),
        preferredDate: currentDay.fullDate,
        preferredTime: selectedSlot.timeRange,
      });

      setConfirmedBooking({
        fullDate: currentDay.fullDate,
        timeRange: selectedSlot.timeRange,
      });
      setShowConfirmation(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      age: '',
      concern: '',
      additionalNotes: '',
    });
    setTherapyType(THERAPY_TYPES[0]);
    setSelectedDayIdx(0);
    setSelectedSlotKey('');
  };

  return (
    <PageTransition>
      <section className="pt-36 pb-16 bg-brand-linen/40 border-b border-brand-charcoal/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            Consultation Request
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-brand-charcoal text-balance">
            Book a Consultation
          </h1>
          <p className="font-serif text-lg md:text-xl italic text-brand-charcoal-muted max-w-2xl mx-auto leading-relaxed text-balance">
            Select your preferred time and share your details to request a consultation.
          </p>
        </div>
      </section>

      <section className="py-24 bg-brand-cream relative">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Authentication banner if not logged in */}
          {!isAuthenticated && (
            <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-amber-800 dark:text-amber-300 rounded-2xl flex items-start space-x-3 text-sm font-sans mb-8">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-600" />
              <div className="space-y-1 text-left">
                <p className="font-sans font-bold text-xs uppercase tracking-wider">Authentication Required</p>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  You must be signed in to request a consultation slot. Please{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="underline font-semibold text-brand-sage hover:text-brand-sage-dark cursor-pointer"
                  >
                    sign in or register
                  </button>{' '}
                  first to preserve your information and complete your request.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10 text-left">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-brand-sage text-brand-cream font-sans text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="font-serif text-2xl font-medium text-brand-charcoal">Therapy Type</h3>
              </div>
              <p className="text-xs font-sans text-brand-charcoal-muted">
                Select the specialization that aligns with your current goals.
              </p>
              <select
                id="therapyType"
                name="therapyType"
                value={therapyType}
                onChange={(e) => setTherapyType(e.target.value)}
                disabled={!isAuthenticated}
                className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans text-brand-charcoal cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {THERAPY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6 border-t border-brand-charcoal/5 pt-10">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-brand-sage text-brand-cream font-sans text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="font-serif text-2xl font-medium text-brand-charcoal">
                  Choose Date &amp; Available Hour
                </h3>
              </div>
              <p className="text-xs font-sans text-brand-charcoal-muted">
                Select a convenient day and time. All online sessions are hosted on our secure telehealth platform.
              </p>

              {scheduleLoading && (
                <div className="flex items-center space-x-3 py-6 animate-pulse" role="status">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-sage border-t-transparent animate-spin shrink-0" />
                  <span className="text-sm font-sans text-brand-charcoal-muted">Retrieving available session slots...</span>
                </div>
              )}

              {scheduleError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2 text-xs font-sans" role="alert">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{scheduleError}</span>
                </div>
              )}

              {!scheduleLoading && !scheduleError && !hasVisibleSlots && (
                <div className="p-6 bg-brand-linen/30 border border-brand-stone/20 rounded-2xl text-center space-y-2 py-8">
                  <p className="font-serif text-lg text-brand-charcoal">No Available Consultation Times</p>
                  <p className="font-sans text-xs md:text-sm text-brand-charcoal-muted max-w-md mx-auto leading-relaxed">
                    There are currently no slots open for booking. Please contact us directly at{' '}
                    <a href="mailto:support@psytherapy.com" className="text-brand-sage hover:underline font-semibold">
                      support@psytherapy.com
                    </a>{' '}
                    to coordinate a suitable appointment.
                  </p>
                </div>
              )}

              {!scheduleLoading && !scheduleError && hasVisibleSlots && currentDay && (
                <>
                  <div className="space-y-3">
                    <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted/60">
                      Select Date (Next 7 Days)
                    </span>
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide" role="listbox" aria-label="Select date">
                      {visibleDays.map((calDay, idx) => (
                        <button
                          key={calDay.date}
                          type="button"
                          disabled={!isAuthenticated}
                          onClick={() => handleDaySelect(idx)}
                          aria-selected={selectedDayIdx === idx}
                          aria-label={`Select date: ${calDay.fullDate}`}
                          className={`p-4 min-w-[76px] rounded-2xl border flex flex-col items-center space-y-1 shrink-0 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                            selectedDayIdx === idx
                              ? 'bg-brand-sage text-brand-cream border-brand-sage'
                              : 'bg-brand-linen/40 border-brand-charcoal/5 hover:border-brand-stone'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-sans tracking-widest uppercase ${
                              selectedDayIdx === idx
                                ? 'text-brand-cream/80'
                                : 'text-brand-charcoal-muted'
                            }`}
                          >
                            {calDay.dayName}
                          </span>
                          <span className="font-serif text-2xl font-semibold leading-none">
                            {calDay.dayNumber}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs text-brand-charcoal-muted">{currentDay.fullDate}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted/60">
                      Available Sessions
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="listbox" aria-label="Available sessions">
                      {currentDay.slots.map((slot) => {
                        const key = slotSelectionKey(currentDay.date, slot);
                        const isSelected = selectedSlotKey === key;
                        const isDisabled = slot.isFull || !isAuthenticated;
                        const spotsText = slot.isFull
                          ? 'Fully booked'
                          : `${slot.availableCapacity} spot${slot.availableCapacity === 1 ? '' : 's'} available`;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => !isDisabled && setSelectedSlotKey(key)}
                            disabled={isDisabled}
                            aria-selected={isSelected}
                            aria-label={`${slot.title}, ${slot.timeRange}, ${spotsText}`}
                            className={`py-4 px-4 rounded-xl border text-left transition-all duration-300 ${
                              isDisabled
                                ? 'bg-brand-linen/20 border-brand-charcoal/5 text-brand-charcoal-muted/50 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal cursor-pointer'
                                  : 'bg-brand-cream border-brand-charcoal/10 text-brand-charcoal hover:border-brand-stone hover:bg-brand-linen/20 cursor-pointer'
                            }`}
                          >
                            <p className="font-sans text-sm font-semibold">{slot.title}</p>
                            <p className="font-sans text-xs mt-1 opacity-90">{slot.timeRange}</p>
                            <p className="font-sans text-[10px] mt-2 uppercase tracking-wide opacity-75">
                              {spotsText}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-6 border-t border-brand-charcoal/5 pt-10">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-brand-sage text-brand-cream font-sans text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <h3 className="font-serif text-2xl font-medium text-brand-charcoal">Your Information</h3>
              </div>
              <p className="text-xs font-sans text-brand-charcoal-muted">
                All clinical and personal information remains strictly confidential under standard HIPAA rules.
              </p>

              {/* Secure Lock Badge */}
              <div className="flex items-start space-x-3 p-4 bg-brand-linen/40 border border-brand-stone/30 rounded-xl mb-6">
                <Lock size={16} className="text-brand-sage shrink-0 mt-0.5" />
                <p className="text-xs font-sans text-brand-charcoal-muted leading-relaxed">
                  <strong>Secure & Private:</strong> Your form entries are transmitted securely, stored safely in our clinical database, and are never shared with third parties.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-xs font-sans font-bold tracking-wide text-brand-charcoal-muted uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={!isAuthenticated}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-xs font-sans font-bold tracking-wide text-brand-charcoal-muted uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!!user?.email}
                    disabled={!isAuthenticated}
                    placeholder="e.g. eleanor@vance.com"
                    className="px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-xs font-sans font-bold tracking-wide text-brand-charcoal-muted uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    disabled={!isAuthenticated}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (503) 555-0100"
                    className="px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="age" className="text-xs font-sans font-bold tracking-wide text-brand-charcoal-muted uppercase">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    min={1}
                    max={120}
                    disabled={!isAuthenticated}
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 32"
                    className="px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col space-y-2 sm:col-span-2">
                  <label htmlFor="concern" className="text-xs font-sans font-bold tracking-wide text-brand-charcoal-muted uppercase">
                    Primary Concern *
                  </label>
                  <textarea
                    id="concern"
                    name="concern"
                    required
                    rows={3}
                    disabled={!isAuthenticated}
                    value={formData.concern}
                    onChange={handleInputChange}
                    placeholder="What would you like support with?"
                    className="px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col space-y-2 sm:col-span-2">
                  <label htmlFor="additionalNotes" className="text-xs font-sans font-bold tracking-wide text-brand-charcoal-muted uppercase">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    disabled={!isAuthenticated}
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Anything else you'd like us to know (optional)..."
                    className="px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2 text-xs font-sans" role="alert">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {!isAuthenticated ? (
                <Button
                  variant="primary"
                  size="lg"
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full justify-center bg-brand-sage hover:bg-brand-sage-dark cursor-pointer font-sans"
                >
                  <span>Sign In to Request Consultation</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-full justify-center font-sans"
                  disabled={isSubmitting || !hasBookableSlot}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Request Consultation'}</span>
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-charcoal/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-brand-cream border border-brand-stone/40 max-w-lg w-full rounded-[32px] p-8 md:p-10 shadow-glass text-center space-y-6 text-brand-charcoal"
            >
              <div className="inline-flex p-4 rounded-full bg-brand-sage-light text-brand-sage-dark shadow-xs mx-auto">
                <CheckCircle size={36} strokeWidth={1.5} />
              </div>

              <div className="space-y-4 text-left">
                <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-brand-charcoal text-center">
                  Consultation Requested
                </h3>
                <p className="font-sans text-sm text-brand-charcoal-muted leading-relaxed text-center">
                  Your consultation request for <strong className="text-brand-charcoal">{confirmedBooking.fullDate}</strong> at <strong className="text-brand-charcoal">{confirmedBooking.timeRange}</strong> has been received.
                </p>
                
                <div className="border-t border-brand-stone/40 pt-4 space-y-3">
                  <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-brand-charcoal">What happens next:</h4>
                  <ul className="space-y-3 text-xs font-sans text-brand-charcoal-muted">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-1.5 shrink-0" />
                      <span><strong>Clinical Review:</strong> Your practitioner will review your primary concern within 24 business hours.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-1.5 shrink-0" />
                      <span><strong>Email Confirmation:</strong> Once confirmed, you will receive a secure video consultation link via email.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-sage mt-1.5 shrink-0" />
                      <span><strong>Intake Form:</strong> Check your inbox for our digital intake questionnaire to complete before your session begins.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button variant="primary" size="md" onClick={handleCloseConfirmation} className="w-full py-3">
                Done
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

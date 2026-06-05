import React, { useCallback, useEffect, useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import {
  getAdminConsultations,
  acceptConsultation,
  rejectConsultation,
  sendConsultationMessage,
  type Consultation,
} from '../services/consultationService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { ConsultationSlotsPanel } from '../components/ConsultationSlotsPanel';

const formatRequestDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const statusStyles: Record<string, string> = {
  pending: 'text-brand-sage-dark bg-brand-sage-light/50',
  accepted: 'text-emerald-800 bg-emerald-50',
  rejected: 'text-red-800 bg-red-50',
};

export const AdminConsultationsPage: React.FC = () => {
  const { token, loading: authLoading } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [messageModalId, setMessageModalId] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  const fetchConsultations = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const data = await getAdminConsultations(token);
      setConsultations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load consultations');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setLoading(false);
      return;
    }
    fetchConsultations();
  }, [token, authLoading, fetchConsultations]);

  const updateConsultationInList = (updated: Consultation) => {
    setConsultations((prev) =>
      prev.map((item) => (item._id === updated._id ? updated : item))
    );
  };

  const handleAccept = async (id: string) => {
    if (!token) return;
    setActionLoadingId(id);
    setError('');
    setSuccessMsg('');

    try {
      const result = await acceptConsultation(token, id);
      if (result.consultation) updateConsultationInList(result.consultation);
      setSuccessMsg(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept request');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!token) return;
    setActionLoadingId(id);
    setError('');
    setSuccessMsg('');

    try {
      const result = await rejectConsultation(token, id);
      if (result.consultation) updateConsultationInList(result.consultation);
      setSuccessMsg(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject request');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendMessage = async () => {
    if (!token || !messageModalId || !customMessage.trim()) return;

    setActionLoadingId(messageModalId);
    setError('');
    setSuccessMsg('');

    try {
      const result = await sendConsultationMessage(token, messageModalId, customMessage.trim());
      setSuccessMsg(result.message);
      setMessageModalId(null);
      setCustomMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setActionLoadingId(null);
    }
  };

  const activeConsultation = consultations.find((c) => c._id === messageModalId);

  return (
    <PageTransition>
      <section className="pt-36 pb-16 bg-brand-linen/40 border-b border-brand-charcoal/5">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-sans font-semibold tracking-widest uppercase text-brand-sage-dark">
            Admin
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-brand-charcoal">
            Consultation Requests
          </h1>
          <p className="font-serif text-lg italic text-brand-charcoal-muted max-w-2xl mx-auto">
            Review submitted consultation requests from clients.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 items-start">
            <div>
          {loading && (
            <p className="font-sans text-sm text-brand-charcoal-muted text-center py-12">
              Loading requests...
            </p>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2 text-sm font-sans">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-brand-sage-light/60 text-brand-sage-dark rounded-xl flex items-center space-x-2 text-sm font-sans">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {!loading && !error && consultations.length === 0 && (
            <p className="font-sans text-sm text-brand-charcoal-muted text-center py-12">
              No consultation requests yet.
            </p>
          )}

          <div className="space-y-6">
            {consultations.map((request) => {
              const isActionLoading = actionLoadingId === request._id;
              const statusClass = statusStyles[request.status] ?? statusStyles.pending;

              return (
                <article
                  key={request._id}
                  className="bg-brand-cream border border-brand-charcoal/5 rounded-[24px] p-6 md:p-8 shadow-glass text-left space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-charcoal/5 pb-4">
                    <h2 className="font-serif text-xl font-medium text-brand-charcoal">
                      {request.name}
                    </h2>
                    <span
                      className={`text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full ${statusClass}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                        Full Name
                      </dt>
                      <dd className="font-sans text-sm text-brand-charcoal">{request.name}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                        Email
                      </dt>
                      <dd className="font-sans text-sm text-brand-charcoal break-all">{request.email}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                        Therapy Type
                      </dt>
                      <dd className="font-sans text-sm text-brand-charcoal">{request.therapyType}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                        Phone Number
                      </dt>
                      <dd className="font-sans text-sm text-brand-charcoal">{request.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                        Age
                      </dt>
                      <dd className="font-sans text-sm text-brand-charcoal">{request.age}</dd>
                    </div>
                  <div>
                    <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                      Request Date
                    </dt>
                    <dd className="font-sans text-sm text-brand-charcoal">
                      {formatRequestDate(request.createdAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                      Preferred Date
                    </dt>
                    <dd className="font-sans text-sm text-brand-charcoal">
                      {request.preferredDate || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                      Preferred Time
                    </dt>
                    <dd className="font-sans text-sm text-brand-charcoal">
                      {request.preferredTime || '—'}
                    </dd>
                  </div>
                </dl>

                  <div>
                    <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                      Primary Concern
                    </dt>
                    <dd className="font-sans text-sm text-brand-charcoal leading-relaxed">{request.concern}</dd>
                  </div>

                  <div>
                    <dt className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted mb-1">
                      Additional Notes
                    </dt>
                    <dd className="font-sans text-sm text-brand-charcoal-muted leading-relaxed">
                      {request.additionalNotes?.trim() || '—'}
                    </dd>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2 border-t border-brand-charcoal/5">
                    <button
                      type="button"
                      onClick={() => handleAccept(request._id)}
                      disabled={isActionLoading || request.status === 'accepted'}
                      className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide bg-brand-sage text-brand-cream hover:bg-brand-sage-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isActionLoading ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(request._id)}
                      disabled={isActionLoading || request.status === 'rejected'}
                      className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-linen/40 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMessageModalId(request._id);
                        setCustomMessage('');
                        setError('');
                      }}
                      disabled={isActionLoading}
                      className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide border border-brand-sage/30 text-brand-sage-dark hover:bg-brand-sage-light/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Message
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
            </div>

            <ConsultationSlotsPanel />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {messageModalId && activeConsultation && (
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
              className="bg-brand-cream border border-brand-stone/40 max-w-lg w-full rounded-[32px] p-8 shadow-glass space-y-5"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-medium text-brand-charcoal">Send Message</h3>
                <p className="font-sans text-xs text-brand-charcoal-muted">
                  To {activeConsultation.name} ({activeConsultation.email})
                </p>
              </div>

              <textarea
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write your message to the client..."
                className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans resize-none"
              />

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSendMessage}
                  className="flex-1 justify-center"
                  disabled={!customMessage.trim() || actionLoadingId === messageModalId}
                >
                  {actionLoadingId === messageModalId ? 'Sending...' : 'Send'}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setMessageModalId(null);
                    setCustomMessage('');
                  }}
                  className="flex-1 px-7 py-3 rounded-full text-sm font-sans font-medium border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-linen/40 transition-colors duration-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

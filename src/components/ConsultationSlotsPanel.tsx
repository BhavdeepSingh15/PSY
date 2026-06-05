import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  createAdminSlot,
  deleteAdminSlot,
  getAdminSlots,
  updateAdminSlotStatus,
  type ConsultationSlot,
} from '../services/slotService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const DAY_OPTIONS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const formatTime12h = (time: string) => {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
};

const getRecurrenceLabel = (slot: ConsultationSlot) => {
  if (slot.recurrenceType === 'daily') {
    return 'Daily';
  }

  const day = DAY_OPTIONS.find((d) => d.value === slot.dayOfWeek);
  return day ? `Weekly — ${day.label}` : 'Weekly';
};

const initialForm = {
  title: '',
  recurrenceType: 'daily' as 'daily' | 'weekly',
  dayOfWeek: '1',
  startTime: '',
  endTime: '',
  maxSessions: '',
};

export const ConsultationSlotsPanel: React.FC = () => {
  const { token, loading: authLoading } = useAuth();
  const [slots, setSlots] = useState<ConsultationSlot[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchSlots = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const data = await getAdminSlots(token);
      setSlots(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load slots');
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
    fetchSlots();
  }, [token, authLoading, fetchSlots]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!form.title.trim() || !form.startTime || !form.endTime) {
      setError('Session title, start time, and end time are required.');
      return;
    }

    if (form.recurrenceType === 'weekly' && form.dayOfWeek === '') {
      setError('Please select a day of the week for weekly slots.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      await createAdminSlot(token, {
        title: form.title.trim(),
        recurrenceType: form.recurrenceType,
        startTime: form.startTime,
        endTime: form.endTime,
        ...(form.recurrenceType === 'weekly'
          ? { dayOfWeek: Number(form.dayOfWeek) }
          : {}),
        ...(form.maxSessions.trim()
          ? { maxSessions: Number(form.maxSessions) }
          : {}),
      });

      setForm(initialForm);
      setSuccessMsg('Consultation slot added successfully.');
      await fetchSlots();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add slot');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (slot: ConsultationSlot) => {
    if (!token) return;

    const nextStatus = slot.status === 'active' ? 'inactive' : 'active';

    setActionId(slot._id);
    setError('');
    setSuccessMsg('');

    try {
      const updated = await updateAdminSlotStatus(token, slot._id, nextStatus);
      setSlots((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      setSuccessMsg(
        nextStatus === 'active' ? 'Slot enabled successfully.' : 'Slot disabled successfully.'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update slot');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    setActionId(id);
    setError('');
    setSuccessMsg('');

    try {
      await deleteAdminSlot(token, id);
      setSlots((prev) => prev.filter((slot) => slot._id !== id));
      setSuccessMsg('Slot deleted successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete slot');
    } finally {
      setActionId(null);
    }
  };

  return (
    <aside className="bg-brand-cream border border-brand-charcoal/5 rounded-[24px] p-6 md:p-8 shadow-glass text-left space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div className="space-y-1 border-b border-brand-charcoal/5 pb-4">
        <h2 className="font-serif text-2xl font-medium text-brand-charcoal">Consultation Slots</h2>
        <p className="font-sans text-xs text-brand-charcoal-muted">
          Create recurring daily or weekly availability rules.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2 text-xs font-sans">
          <AlertCircle size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-brand-sage-light/60 text-brand-sage-dark rounded-xl flex items-center space-x-2 text-xs font-sans">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleAddSlot} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="slot-title"
            className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted"
          >
            Session Title
          </label>
          <input
            id="slot-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Morning Consultation"
            className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="slot-recurrence"
            className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted"
          >
            Recurrence Type
          </label>
          <select
            id="slot-recurrence"
            name="recurrenceType"
            value={form.recurrenceType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans cursor-pointer"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {form.recurrenceType === 'weekly' && (
          <div className="space-y-2">
            <label
              htmlFor="slot-dow"
              className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted"
            >
              Day Of Week
            </label>
            <select
              id="slot-dow"
              name="dayOfWeek"
              value={form.dayOfWeek}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans cursor-pointer"
            >
              {DAY_OPTIONS.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="slot-start"
              className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted"
            >
              Start Time
            </label>
            <input
              id="slot-start"
              name="startTime"
              type="time"
              value={form.startTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="slot-end"
              className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted"
            >
              End Time
            </label>
            <input
              id="slot-end"
              name="endTime"
              type="time"
              value={form.endTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="slot-max"
            className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted"
          >
            Maximum Sessions <span className="normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="slot-max"
            name="maxSessions"
            type="number"
            min={1}
            placeholder="1"
            value={form.maxSessions}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 rounded-full text-sm font-sans font-semibold tracking-wide bg-brand-sage text-brand-cream hover:bg-brand-sage-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? 'Adding...' : 'Add Slot'}
        </button>
      </form>

      <div className="space-y-4 border-t border-brand-charcoal/5 pt-6">
        <h3 className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted">
          Slot Rules
        </h3>

        {loading && (
          <p className="font-sans text-sm text-brand-charcoal-muted">Loading slots...</p>
        )}

        {!loading && slots.length === 0 && (
          <p className="font-sans text-sm text-brand-charcoal-muted">No slots available</p>
        )}

        <ul className="space-y-3">
          {slots.map((slot) => {
            const isBusy = actionId === slot._id;

            return (
              <li
                key={slot._id}
                className="p-4 rounded-2xl border border-brand-charcoal/5 bg-brand-linen/30 space-y-2"
              >
                <p className="font-sans text-sm font-semibold text-brand-charcoal">{slot.title}</p>
                <p className="font-sans text-sm text-brand-charcoal">
                  <span className="font-semibold">{getRecurrenceLabel(slot)}</span>
                </p>
                <p className="font-sans text-sm text-brand-charcoal">
                  {formatTime12h(slot.startTime)} - {formatTime12h(slot.endTime)}
                </p>
                <p className="font-sans text-xs text-brand-charcoal-muted">
                  Max: {slot.maxSessions} · Booked: {slot.bookedCount} ·{' '}
                  <span
                    className={
                      slot.status === 'active' ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'
                    }
                  >
                    {slot.status}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(slot)}
                    disabled={isBusy}
                    className="px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wide border border-brand-sage/30 text-brand-sage-dark hover:bg-brand-sage-light/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isBusy ? 'Updating...' : slot.status === 'active' ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(slot._id)}
                    disabled={isBusy}
                    className="px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wide border border-red-200 text-red-700 hover:bg-red-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isBusy ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

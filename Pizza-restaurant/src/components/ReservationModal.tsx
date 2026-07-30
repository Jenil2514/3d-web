import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Flame, CheckCircle2, Phone, Mail, User } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState('2026-07-31');
  const [time, setTime] = useState('19:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#FFF8F3] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F4A261]/20 z-10 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white text-[#222222] hover:text-[#E63946] shadow-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="font-display font-bold text-2xl text-[#222222]">Table Reserved!</h3>
              <p className="text-xs text-[#222222]/70 max-w-xs mx-auto">
                We've reserved your table for {guests} on {date} at {time}. A confirmation SMS has been sent to {phone || 'your mobile'}.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E63946]/10 text-[#E63946] text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Dine-In Reservation</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[#222222]">
                  Reserve Your Table
                </h3>
                <p className="text-xs text-[#222222]/60">
                  Experience wood-fired hearth dining right in front of our open kitchen.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#222222] mb-1.5">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222222]/40" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 bg-white rounded-xl border border-black/10 font-bold focus:outline-none focus:border-[#E63946]"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests (Chef Table)</option>
                      <option>8+ Guests (VIP Lounge)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#222222] mb-1.5">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222222]/40" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-black/10 focus:outline-none focus:border-[#E63946]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#222222] mb-1.5">Time Slot</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222222]/40" />
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-black/10 focus:outline-none focus:border-[#E63946]"
                      >
                        <option value="17:30">5:30 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#222222] mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222222]/40" />
                    <input
                      type="text"
                      required
                      placeholder="Chef Marco Rossi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-black/10 focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#222222] mb-1.5">Mobile Phone (for SMS confirmation)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222222]/40" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-black/10 focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#E63946] text-white font-display font-bold text-sm shadow-lg shadow-[#E63946]/30 hover:bg-[#d62839] transition-all cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

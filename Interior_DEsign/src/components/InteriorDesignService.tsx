import React, { useState } from 'react';
import { Sparkles, Calendar, Home, Monitor, Store, Check, ArrowRight, X, Phone, User, Mail, MapPin } from 'lucide-react';
import { DesignServiceBooking } from '../types';

interface InteriorDesignServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteriorDesignService: React.FC<InteriorDesignServiceProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [formData, setFormData] = useState<DesignServiceBooking>({
    serviceType: 'In-Home Consultation',
    roomType: 'Living Room',
    preferredStyle: 'Warm Nordic Minimalist',
    fullName: '',
    email: '',
    phone: '',
    city: 'Toronto',
    preferredDate: '2026-08-10',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const resetForm = () => {
    setBookingSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-none border border-[#E6DDD4] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#171615] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                BoConcept Interior Service
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light">
                Book a Complimentary Stylist
              </h3>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingSubmitted ? (
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-[#2D3E35] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="font-serif text-3xl font-light text-[#171615]">
                Appointment Requested!
              </h4>
              <p className="text-sm text-gray-600 mt-2 font-light">
                Thank you, <strong>{formData.fullName}</strong>. A dedicated BoConcept interior designer from our <strong>{formData.city}</strong> studio will contact you shortly to confirm your <strong>{formData.serviceType}</strong> on <strong>{formData.preferredDate}</strong>.
              </p>
            </div>
            <div className="bg-[#F4EFEA] p-4 border border-[#E6DDD4] max-w-md mx-auto text-xs text-left font-mono space-y-1">
              <div><strong className="text-gray-500">Service:</strong> {formData.serviceType}</div>
              <div><strong className="text-gray-500">Space Focus:</strong> {formData.roomType}</div>
              <div><strong className="text-gray-500">Style Vibe:</strong> {formData.preferredStyle}</div>
            </div>
            <button
              onClick={resetForm}
              className="bg-[#171615] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-all"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#E6DDD4] pb-4 text-xs font-semibold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#171615]' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-[#171615] text-white' : 'bg-[#E6DDD4]'}`}>1</span>
                <span>Service</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#171615]' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-[#171615] text-white' : 'bg-[#E6DDD4]'}`}>2</span>
                <span>Space & Vibe</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#171615]' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-[#171615] text-white' : 'bg-[#E6DDD4]'}`}>3</span>
                <span>Contact Info</span>
              </div>
            </div>

            {/* STEP 1: Select Consultation Format */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p className="text-xs uppercase tracking-widest text-[#B0977B] font-semibold">
                  Select Consultation Type
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'In-Home Consultation', icon: Home, title: 'In-Home Visit', desc: 'Our designer visits your home to measure, evaluate lighting, and create 3D floor plans.' },
                    { id: 'In-Store Styling', icon: Store, title: 'In-Store Studio', desc: 'Meet in our showroom with fabric swatches, 3D renderings, and coffee.' },
                    { id: 'Virtual 3D Consultation', icon: Monitor, title: 'Virtual 3D Call', desc: 'Screen-share 3D room layouts and moodboards from the comfort of home.' }
                  ].map((srv) => (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => setFormData({ ...formData, serviceType: srv.id as any })}
                      className={`p-5 text-left border transition-all flex flex-col justify-between space-y-3 ${
                        formData.serviceType === srv.id
                          ? 'border-[#171615] bg-[#F4EFEA] ring-1 ring-[#171615]'
                          : 'border-[#E6DDD4] bg-[#FAF8F5] hover:border-gray-400'
                      }`}
                    >
                      <srv.icon className={`w-6 h-6 ${formData.serviceType === srv.id ? 'text-[#B0977B]' : 'text-gray-600'}`} />
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#171615]">{srv.title}</h4>
                        <p className="text-xs text-gray-600 mt-1 font-light">{srv.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#171615] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B] transition-all flex items-center gap-2"
                  >
                    <span>Next: Select Room & Style</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Room Focus & Design Aesthetic */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#B0977B] font-semibold block mb-2">
                    Primary Space Focus
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full p-3 bg-[#F4EFEA] border border-[#E6DDD4] text-sm outline-none font-medium"
                  >
                    <option value="Living Room">Living Room & Lounge</option>
                    <option value="Dining Room">Dining Room & Entertaining</option>
                    <option value="Master Bedroom">Master Bedroom Suite</option>
                    <option value="Home Office">Executive Home Office</option>
                    <option value="Entire Residence">Entire Residence Interior</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-[#B0977B] font-semibold block mb-2">
                    Preferred Aesthetic Vibe
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Warm Nordic Minimalist',
                      'Contemporary Organic Modern',
                      'Danish Classic Elegance',
                      'Urban Industrial Chic'
                    ].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setFormData({ ...formData, preferredStyle: st })}
                        className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all ${
                          formData.preferredStyle === st
                            ? 'border-[#171615] bg-[#171615] text-white'
                            : 'border-[#E6DDD4] bg-[#F4EFEA] text-[#171615] hover:border-gray-400'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-[#171615] text-[#171615] px-6 py-3 text-xs uppercase font-semibold hover:bg-black/5"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-[#171615] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B] flex items-center gap-2"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact & Booking Confirmation */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p className="text-xs uppercase tracking-widest text-[#B0977B] font-semibold">
                  Designer Contact Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-3 bg-[#F4EFEA] border border-[#E6DDD4] text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-[#F4EFEA] border border-[#E6DDD4] text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (416) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-[#F4EFEA] border border-[#E6DDD4] text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Nearest City Studio</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 bg-[#F4EFEA] border border-[#E6DDD4] text-sm outline-none"
                    >
                      <option value="Toronto">Toronto Studio</option>
                      <option value="Vancouver">Vancouver Showroom</option>
                      <option value="Montreal">Montreal Design Centre</option>
                      <option value="Calgary">Calgary Studio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Preferred Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full p-3 bg-[#F4EFEA] border border-[#E6DDD4] text-sm outline-none font-mono"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-[#171615] text-[#171615] px-6 py-3 text-xs uppercase font-semibold hover:bg-black/5"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#171615] text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-all flex items-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Confirm Free Consultation</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};

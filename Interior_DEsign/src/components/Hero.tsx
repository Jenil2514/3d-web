import React, { useState } from 'react';
import { ArrowRight, Sparkles, ChevronRight, ChevronLeft, SlidersHorizontal } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onScrollToConfigurator: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'The Art of Danish Living',
    subtitle: 'Extraordinary Danish craftsmanship designed for tailored modern living.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80',
    highlightItem: 'Bergamo Modular Sofa',
    ctaText: 'Customise Furniture'
  },
  {
    id: 2,
    title: 'Sculptural Scandinavian Elegance',
    subtitle: 'Iconic silhouettes shaped by world-renowned Danish designers.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80',
    highlightItem: 'Imola Armchair',
    ctaText: 'Explore Collection'
  },
  {
    id: 3,
    title: 'Bespoke Interior Design Service',
    subtitle: 'From a single room transformation to complete home styling, our designers bring your vision to life.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=2400&q=80',
    highlightItem: 'Complimentary 3D Consultation',
    ctaText: 'Book Stylist'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onScrollToConfigurator }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative h-[85vh] min-h-[580px] max-h-[850px] w-full overflow-hidden bg-[#171615]">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 transition-all duration-700 ease-in-out">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
        />
        {/* Dark Vignette Overlay for BoConcept Premium Aesthetic */}
        <div className="absolute inset-0 boconcept-gradient-dark" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-8 flex flex-col justify-between py-12 md:py-16 text-white">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5]/10 backdrop-blur-md border border-[#FAF8F5]/20 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            Live Ekstraordinær
          </div>
          <div className="text-xs uppercase tracking-widest text-white/70 hidden sm:block">
            {slide.highlightItem}
          </div>
        </div>

        {/* Center Main Text */}
        <div className="max-w-2xl space-y-4 my-auto">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08]">
            {slide.title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onScrollToConfigurator}
              className="bg-[#FAF8F5] text-[#171615] px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all flex items-center gap-3 shadow-lg group"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenConsultation}
              className="border border-white/40 bg-white/10 backdrop-blur-md text-white px-7 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-[#171615] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Book Interior Stylist</span>
            </button>
          </div>
        </div>

        {/* Bottom Slide Navigation & Indicators */}
        <div className="flex items-center justify-between pt-6 border-t border-white/15">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-[#C5A059]' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#C5A059] font-bold">0{currentSlide + 1}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">0{HERO_SLIDES.length}</span>

            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={prevSlide}
                className="p-2 border border-white/20 hover:border-white/60 hover:bg-white/10 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 border border-white/20 hover:border-white/60 hover:bg-white/10 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

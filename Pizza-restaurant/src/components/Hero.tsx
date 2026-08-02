import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Star, Flame, Sparkles, ArrowRight, Truck, Award } from 'lucide-react';
import {
  initFramePreloader,
  getCachedImage,
  getNearestCachedImage,
  subscribeFrameLoaded,
  TOTAL_FRAME_COUNT,
  FRAME_PATHS
} from '../utils/framePreloader';

interface HeroProps {
  onQuickOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickOrder }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const frameIndexRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [translateY, setTranslateY] = useState(0);

  // Draw target frame onto canvas with cover aspect ratio and HiDPI scaling
  const drawCanvasFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getCachedImage(idx) || getNearestCachedImage(idx);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(rect.width * dpr);
    const height = Math.floor(rect.height * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Initialize preloader and subscribe to newly loaded frames
  useEffect(() => {
    initFramePreloader();
    drawCanvasFrame(frameIndexRef.current);

    const unsubscribe = subscribeFrameLoaded(() => {
      drawCanvasFrame(frameIndexRef.current);
    });

    return () => {
      unsubscribe();
    };
  }, [drawCanvasFrame]);

  // Desktop scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (window.innerWidth < 1024) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      setIsVisible(inView);

      const maxScroll = window.innerHeight * 2;
      if (maxScroll <= 0) return;

      const scrolled = -sectionTop;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      let y = 0;
      if (scrolled > maxScroll) {
        y = -(scrolled - maxScroll);
      }
      setTranslateY(y);

      const index = Math.floor(progress * (TOTAL_FRAME_COUNT - 1));
      frameIndexRef.current = index;
      setFrameIndex(index);
      drawCanvasFrame(index);
    };

    const handleResize = () => {
      handleScroll();
      drawCanvasFrame(frameIndexRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawCanvasFrame]);

  // Static pizza images for mobile slides
  const mobileSlide1Image = FRAME_PATHS[0] || '/pizza-frames/ezgif-frame-001.webp';
  const mobileSlide2Image = FRAME_PATHS[Math.floor(TOTAL_FRAME_COUNT * 0.45)] || '/pizza-frames/ezgif-frame-100.webp';
  const mobileSlide3Image = FRAME_PATHS[TOTAL_FRAME_COUNT - 1] || '/pizza-frames/ezgif-frame-245.webp';

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE VIEW (lg:hidden): Clean, Large Pizza Layout
          Slide 1: Image Left, Info Right
          Slide 2: Info Left, Image Right
          Slide 3: Image Left, Info Right
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full bg-white space-y-12 py-20 px-5">

        {/* Mobile Pizza 1 (Image Left, Info Right) */}
        {/* REMOVED px-5 here so the image can go full screen width */}
        <div className="lg:hidden w-full bg-white space-y-8 py-12">

          {/* Mobile Pizza 1 Container */}
          <div className="space-y-6 text-left">

            {/* ENLARGED: Added aspect-[4/5] to make the image tall and impressive, and removed rounded corners on the screen edge */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden shadow-lg">

              {/* The Image: Added h-full and object-cover to make sure it fills the large space perfectly */}
              <img
                src={mobileSlide1Image}
                alt="Freshly Baked Artisan Pizza"
                className="w-full h-full object-cover block"
              />

              {/* Dark Gradient Overlay for perfect text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Text & Badge Overlay Container (Added px-5 back here to keep text aligned) */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 px-5 pb-8 space-y-4">

                {/* The Badge */}
                <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF3EE] border border-[#F4A261]/30">
                  <span className="flex h-2 w-2 rounded-full bg-[#E63946] animate-ping" />
                  <Flame className="w-4 h-4 text-[#E63946]" />
                  <span className="text-xs font-bold tracking-wide text-[#222222] uppercase">
                    Wood Fired Craftsmanship
                  </span>
                </div>

                {/* The Heading (Slightly increased to text-4xl since the image container is now large) */}
                <h1 className="font-display text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
                  Freshly Baked <br />
                  <span className="font-serif-title italic font-normal text-[#F4A261]">
                    Happiness
                  </span>{' '}
                  In Every Slice.
                </h1>

              </div>
            </div>

            {/* Description and Buttons (Kept padding px-5 here so text doesn't touch the screen edges) */}
            <div className="px-5 space-y-5">
              <p className="text-sm text-[#555] leading-relaxed">
                Hand-stretched 24-hour cold fermented dough, volcanic stone wood-fired at 800°F, topped with imported DOP Italian cheese.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E63946] text-white text-sm font-bold shadow-md active:scale-95 transition-all"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#222222] text-sm font-bold border border-black/10 shadow-sm active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#F4A261]" />
                  <span>Explore Menu</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <hr className="border-black/5 mx-5" />

        {/* Mobile Pizza 2 Container */}
        <div className="space-y-6 text-left">

          {/* ENLARGED IMAGE CARD: Edge-to-edge layout matching Section 1 */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden shadow-lg">

            {/* The Image: Changed object-contain to object-cover to completely fill the massive portrait frame */}
            <img
              src={mobileSlide2Image}
              alt="Seven Cheese Pizza"
              className="w-full h-full object-cover block"
            />

            {/* Dark Gradient Overlay for perfect text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Text & Badge Overlay Container (Pinned over the image) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 px-5 pb-8 space-y-4">

              {/* The Badge */}
              <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF3EE] border border-[#F4A261]/30">
                <Flame className="w-4 h-4 text-[#E63946]" />
                <span className="text-xs font-bold tracking-wide text-[#222222] uppercase">
                  Chef's Special Recommendation
                </span>
              </div>

              {/* The Heading (Changed text color to white to contrast against the dark background) */}
              <h2 className="font-display text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
                Seven Cheese <br />
                <span className="font-serif-title italic font-normal text-[#F4A261]">
                  Extravaganza
                </span>
              </h2>

            </div>
          </div>

          {/* Description, Buttons, and Tags (Safely padded inside px-5 to avoid screen edges) */}
          <div className="px-5 space-y-5">
            <p className="text-sm text-[#555] leading-relaxed">
              Indulgent blend of seven artisanal cheeses: Smoked Buffalo Mozzarella, Gorgonzola Dolce, Sharp Provolone, Creamy Ricotta, Fontina, Parmigiano & Pecorino with pistachio.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onQuickOrder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E63946] text-white text-sm font-bold shadow-md active:scale-95 transition-all"
              >
                <span>Order Sete Formaggi - $21.50</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ingredient Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Buffalo Mozzarella', 'Gorgonzola Dolce', 'Fresh Ricotta', 'Pistachio'].map((ing) => (
                <span key={ing} className="text-xs font-bold px-3 py-1.5 bg-[#F8F8F8] border border-black/5 rounded-xl text-[#222222]">
                  🍕 {ing}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-black/5 mx-5" />


        {/* Mobile Pizza 3 Container */}
        <div className="space-y-6 text-left">

          {/* ENLARGED IMAGE CARD: Edge-to-edge layout matching Sections 1 & 2 */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden shadow-lg">

            {/* The Image: Fills the entire tall portrait frame smoothly */}
            <img
              src={mobileSlide3Image}
              alt="Artisan Margherita DOC"
              className="w-full h-full object-cover block"
            />

            {/* Dark Gradient Overlay for flawless text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Text & Badge Overlay Container (Pinned perfectly over the image) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 px-5 pb-8 space-y-4">

              {/* The Badge */}
              <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF3EE] border border-[#F4A261]/30">
                <Flame className="w-4 h-4 text-[#E63946]" />
                <span className="text-xs font-bold tracking-wide text-[#222222] uppercase">
                  The Italian Classic Heritage
                </span>
              </div>

              {/* The Heading (Swapped colors to white & gold text for the image contrast) */}
              <h2 className="font-display text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
                Artisan Margherita <br />
                <span className="font-serif-title italic font-normal text-[#F4A261]">
                  Verace DOC
                </span>
              </h2>

            </div>
          </div>

          {/* Description, Buttons, and Tags (Safely padded inside px-5 to protect screen margins) */}
          <div className="px-5 space-y-5">
            <p className="text-sm text-[#555] leading-relaxed">
              Hand-crushed sweet San Marzano DOP tomatoes, fresh Buffalo Mozzarella Campana DOP, cold-pressed EVOO, and organic basil.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onQuickOrder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E63946] text-white text-sm font-bold shadow-md active:scale-95 transition-all"
              >
                <span>Order Margherita - $15.99</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ingredient Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['San Marzano DOP', 'Bufala Mozzarella', 'Organic Basil', 'EVOO'].map((ing) => (
                <span key={ing} className="text-xs font-bold px-3 py-1.5 bg-[#F8F8F8] border border-black/5 rounded-xl text-[#222222]">
                  🌿 {ing}
                </span>
              ))}
            </div>
          </div>

        </div>


      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP VIEW (hidden lg:block): Preserved 3D Frame Scroll Animation
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={sectionRef}
        id="home"
        className="hidden lg:block relative w-full h-[300vh] bg-white overflow-visible"
      >
        {/* Ambient background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F4A261]/20 via-[#FFD166]/15 to-[#E63946]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Fixed desktop canvas */}
        <div
          className={`fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        {/* Desktop Slides Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">

          {/* Desktop Slide 1 */}
          <div className="max-w-7xl mx-auto px-8 w-full h-screen flex items-center pt-36">
            <div className="grid grid-cols-12 gap-8 items-center w-full pointer-events-auto">
              <div className="col-span-7" />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="col-span-5 space-y-6 text-left z-10"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#F4A261]/30 shadow-sm backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-[#E63946] animate-ping" />
                  <Flame className="w-4 h-4 text-[#E63946]" />
                  <span className="text-xs font-bold tracking-wide text-[#222222] uppercase">
                    Wood Fired Craftsmanship
                  </span>
                </div>
                <div>
                  <h1 className="font-display text-6xl xl:text-7xl font-extrabold text-[#222222] leading-[1.08] tracking-tight">
                    Freshly Baked <br />
                    <span className="font-serif-title italic font-normal text-[#E63946] relative inline-block">
                      Happiness
                      <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F4A261]/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                      </svg>
                    </span>{' '}
                    In Every Slice.
                  </h1>
                </div>
                <p className="text-lg text-[#222222]/70 font-normal leading-relaxed">
                  Hand-stretched 24-hour cold fermented dough, volcanic stone wood-fired at 800°F, topped with imported DOP Italian cheese.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#menu" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#E63946] text-white text-base font-bold shadow-xl shadow-[#E63946]/30 hover:bg-[#d62839] hover:-translate-y-1 transition-all cursor-pointer group">
                    <span>Order Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#menu" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-[#222222] text-base font-bold border border-black/10 shadow-sm hover:border-[#F4A261] hover:bg-[#FFF8F3] hover:-translate-y-1 transition-all cursor-pointer">
                    <Sparkles className="w-4 h-4 text-[#F4A261]" />
                    <span>Explore Menu</span>
                  </a>
                </div>
                <div className="pt-4 border-t border-black/5 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1517841905240-472988babdf9'].map((id) => (
                        <img key={id} className="h-9 w-9 rounded-full ring-2 ring-white object-cover" src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&q=80`} alt="Customer" referrerPolicy="no-referrer" />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                        <span className="text-sm font-extrabold text-[#222222] ml-1">4.9</span>
                      </div>
                      <p className="text-xs text-[#222222]/60 font-medium">From 12,000+ Pizza Lovers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-[#222222]/80">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/5">
                      <Truck className="w-4 h-4 text-[#E63946]" /> 30-Min Fast Delivery
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/5">
                      <Award className="w-4 h-4 text-[#F4A261]" /> DOP Italian Ingredients
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Slide 2 */}
          <div className="max-w-7xl mx-auto px-8 w-full h-screen flex items-center pt-36">
            <div className="grid grid-cols-12 gap-8 items-center w-full pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="col-span-5 space-y-8 text-left z-10"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#F4A261]/30 shadow-sm backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-[#E63946] animate-ping" />
                  <Flame className="w-4 h-4 text-[#E63946]" />
                  <span className="text-xs font-bold tracking-wide text-[#222222] uppercase">
                    Chef's Special Recommendation
                  </span>
                </div>
                <h2 className="font-display text-6xl xl:text-7xl font-extrabold text-[#222222] leading-[1.08] tracking-tight">
                  Seven Cheese <br />
                  <span className="font-serif-title italic font-normal text-[#E63946]">Extravaganza</span>
                </h2>
                <p className="text-lg text-[#222222]/70 leading-relaxed">
                  Indulgent blend of seven artisanal cheeses: Smoked Buffalo Mozzarella, Aged Gorgonzola Dolce, Sharp Provolone, Creamy Ricotta, Fontina, Parmigiano Reggiano, and Pecorino Romano with crushed pistachio.
                </p>
                <button onClick={onQuickOrder} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#E63946] text-white text-base font-bold shadow-xl shadow-[#E63946]/30 hover:bg-[#d62839] hover:-translate-y-1 transition-all cursor-pointer group">
                  <span>Order Sette Formaggi - $21.50</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex flex-wrap gap-3">
                  {['Buffalo Mozzarella', 'Gorgonzola Dolce', 'Fresh Ricotta', 'Pistachio'].map((ing) => (
                    <span key={ing} className="text-xs font-bold px-3 py-1.5 bg-white border border-black/5 rounded-xl text-[#222222]">🍕 {ing}</span>
                  ))}
                </div>
              </motion.div>
              <div className="col-span-7" />
            </div>
          </div>

          {/* Desktop Slide 3 */}
          <div className="max-w-7xl mx-auto px-8 w-full h-screen flex items-center pt-36">
            <div className="grid grid-cols-12 gap-8 items-center w-full pointer-events-auto">
              <div className="col-span-7" />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="col-span-5 space-y-8 text-left z-10"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#F4A261]/30 shadow-sm backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-[#E63946] animate-ping" />
                  <Flame className="w-4 h-4 text-[#E63946]" />
                  <span className="text-xs font-bold tracking-wide text-[#222222] uppercase">
                    The Italian Classic Heritage
                  </span>
                </div>
                <h2 className="font-display text-6xl xl:text-7xl font-extrabold text-[#222222] leading-[1.08] tracking-tight">
                  Artisan Margherita <br />
                  <span className="font-serif-title italic font-normal text-[#E63946]">Verace DOC</span>
                </h2>
                <p className="text-lg text-[#222222]/70 leading-relaxed">
                  The golden classic. Hand-crushed sweet San Marzano tomatoes, fresh Buffalo Mozzarella Campana DOP, extra virgin olive oil, and organic garden basil leaves.
                </p>
                <button onClick={onQuickOrder} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#E63946] text-white text-base font-bold shadow-xl shadow-[#E63946]/30 hover:bg-[#d62839] hover:-translate-y-1 transition-all cursor-pointer group">
                  <span>Order Margherita - $15.99</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex flex-wrap gap-3">
                  {['San Marzano DOP', 'Bufala Mozzarella', 'Organic Basil', 'Cold-Pressed EVOO'].map((ing) => (
                    <span key={ing} className="text-xs font-bold px-3 py-1.5 bg-white border border-black/5 rounded-xl text-[#222222]">🌿 {ing}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

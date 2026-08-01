import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Layers, ArrowDown } from 'lucide-react';
const INITIAL_LOAD_FRAMES = 60;
const SEQUENCES = [
    {
        id: 'design-4',
        name: '3D Design I — Architectural Living Suite',
        subtitle: 'Dynamic spatial flow & light orientation across modern Scandinavian living',
        totalFrames: 156,
        folder: '/frames/project4_webp',
        extension: 'webp'
    },
    {
        id: 'design-6',
        name: '3D Design II — Luxury Lounge & Penthouse',
        subtitle: 'Seamless 360° rotation highlighting bespoke materials & organic contours',
        totalFrames: 145,
        folder: '/frames/project6_webp',
        extension: 'webp'
    }
];
export const Scroll3DAnimation = ({ onScrollToCustomizer }) => {
    const [activeSeqIndex, setActiveSeqIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const animFrameRef = useRef(null);
    const currentSeq = SEQUENCES[activeSeqIndex];
    // Two-Stage Progressive Loading: Load first 60 frames initially, then load remaining frames in background
    useEffect(() => {
        setIsLoading(true);
        setLoadedCount(0);
        const initialImages = new Array(currentSeq.totalFrames);
        imagesRef.current = initialImages;
        let initialLoaded = 0;
        const initialTarget = Math.min(INITIAL_LOAD_FRAMES, currentSeq.totalFrames);
        // Stage 1: Load initial 60 frames for instant interactive display
        for (let i = 1; i <= initialTarget; i++) {
            const img = new Image();
            const numStr = String(i).padStart(3, '0');
            img.src = `${currentSeq.folder}/frame_${numStr}.${currentSeq.extension}`;
            img.onload = () => {
                initialLoaded++;
                setLoadedCount(initialLoaded);
                if (initialLoaded >= initialTarget) {
                    setIsLoading(false);
                    loadRemainingFrames();
                }
            };
            img.onerror = () => {
                initialLoaded++;
                setLoadedCount(initialLoaded);
                if (initialLoaded >= initialTarget) {
                    setIsLoading(false);
                    loadRemainingFrames();
                }
            };
            imagesRef.current[i - 1] = img;
        }
        // Stage 2: Background load remaining frames (61 to totalFrames)
        const loadRemainingFrames = () => {
            for (let i = initialTarget + 1; i <= currentSeq.totalFrames; i++) {
                if (imagesRef.current[i - 1])
                    continue;
                const img = new Image();
                const numStr = String(i).padStart(3, '0');
                img.src = `${currentSeq.folder}/frame_${numStr}.${currentSeq.extension}`;
                img.onload = () => {
                    setLoadedCount(prev => prev + 1);
                };
                imagesRef.current[i - 1] = img;
            }
        };
        return () => {
            imagesRef.current = [];
        };
    }, [activeSeqIndex]);
    // Canvas Draw Function with High-DPI, Cover Fitting, and Nearest-Frame Fallback
    const renderFrame = (frameIdx) => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const images = imagesRef.current;
        if (!images || images.length === 0)
            return;
        let img = images[frameIdx];
        if (!img || !img.complete || img.naturalWidth === 0) {
            // Find closest loaded frame if target frame is still fetching in background
            for (let i = frameIdx - 1; i >= 0; i--) {
                if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
                    img = images[i];
                    break;
                }
            }
            if (!img || !img.complete || img.naturalWidth === 0) {
                for (let i = frameIdx + 1; i < images.length; i++) {
                    if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
                        img = images[i];
                        break;
                    }
                }
            }
        }
        if (!img || !img.complete || img.naturalWidth === 0)
            return;
        // Handle high DPI crisp rendering
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
        }
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        // Calculate aspect cover ratio
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = displayWidth / displayHeight;
        let renderWidth = displayWidth;
        let renderHeight = displayHeight;
        let offsetX = 0;
        let offsetY = 0;
        if (canvasRatio > imgRatio) {
            renderHeight = displayWidth / imgRatio;
            offsetY = (displayHeight - renderHeight) / 2;
        }
        else {
            renderWidth = displayHeight * imgRatio;
            offsetX = (displayWidth - renderWidth) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        ctx.restore();
    };
    // Scroll Tracking Handler
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || imagesRef.current.length === 0)
                return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable <= 0)
                return;
            // Calculate how far into the 3D scroll section we are
            const scrolled = -rect.top;
            const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
            setProgress(currentProgress);
            const frameCount = imagesRef.current.length;
            const targetIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
            if (animFrameRef.current)
                cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = requestAnimationFrame(() => {
                renderFrame(targetIndex);
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (animFrameRef.current)
                cancelAnimationFrame(animFrameRef.current);
        };
    }, [isLoading, activeSeqIndex]);
    // Initial draw when loaded
    useEffect(() => {
        if (!isLoading && imagesRef.current.length > 0) {
            renderFrame(0);
        }
    }, [isLoading]);
    return (_jsx("section", { ref: containerRef, className: "relative w-full bg-[#0F0E0D] text-white", style: { height: '260vh' }, children: _jsxs("div", { className: "sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8", children: [_jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" }), _jsx("div", { className: "absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0F0E0D] via-[#0F0E0D]/70 to-transparent z-1 pointer-events-none" }), _jsx("div", { className: "absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/20 to-transparent z-1 pointer-events-none" }), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto w-full flex items-center justify-end pt-16 sm:pt-20 px-2 sm:px-4", children: _jsx("div", { className: "flex items-center gap-2 bg-black/85 backdrop-blur-md p-1.5 border border-white/25 shadow-2xl rounded-sm", children: SEQUENCES.map((seq, idx) => (_jsxs("button", { onClick: () => {
                                setActiveSeqIndex(idx);
                                setProgress(0);
                            }, className: `px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${activeSeqIndex === idx
                                ? 'bg-[#C5A059] text-white shadow-lg ring-1 ring-[#C5A059]/50'
                                : 'text-white/70 hover:text-white hover:bg-white/10'}`, children: [_jsx(Layers, { className: "w-3.5 h-3.5" }), _jsxs("span", { children: ["Design 0", idx + 1] })] }, seq.id))) }) }), isLoading && (_jsxs("div", { className: "absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4", children: [_jsx("div", { className: "w-12 h-12 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" }), _jsxs("div", { className: "text-center space-y-1", children: [_jsx("span", { className: "text-xs font-mono uppercase tracking-widest text-[#C5A059]", children: "Preparing 3D Spatial Frames" }), _jsxs("p", { className: "text-xs text-white/60 font-mono", children: [loadedCount, " / ", INITIAL_LOAD_FRAMES, " Frames Ready"] })] })] })), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto w-full mt-auto mb-10 px-2 sm:px-4 pointer-events-none flex justify-end", children: _jsxs("div", { className: "max-w-md bg-black/70 backdrop-blur-md border border-white/15 p-5 space-y-2 pointer-events-auto shadow-2xl rounded-sm", children: [_jsx("span", { className: "text-[10px] font-mono uppercase text-[#C5A059] tracking-widest font-bold", children: "01 / Spatial 3D Experience" }), _jsx("h4", { className: "font-serif text-lg sm:text-xl font-light text-white", children: "Light & Spatial Harmony" }), _jsx("p", { className: "text-xs text-white/75 font-light leading-relaxed", children: "Scroll down to orbit through the spatial layout. Experience how natural illumination highlights Danish leather grain and fabric weave." }), _jsxs("button", { onClick: onScrollToCustomizer, className: "pt-1 text-[11px] text-[#C5A059] font-semibold uppercase tracking-widest hover:underline flex items-center gap-1", children: [_jsx("span", { children: "Customise In 3D Below" }), _jsx(ArrowDown, { className: "w-3.5 h-3.5" })] })] }) })] }) }));
};

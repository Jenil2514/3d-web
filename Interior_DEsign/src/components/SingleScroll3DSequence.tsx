import React, { useEffect, useRef, useState } from 'react';

interface CleanScroll3DSequenceProps {
  id: string;
  totalFrames: number;
  folder: string;
  ext: string;
  fallbackFolder?: string;
  fallbackExt?: string;
  step?: number;
}

export const CleanScroll3DSequence: React.FC<CleanScroll3DSequenceProps> = ({
  id,
  totalFrames,
  folder,
  ext,
  fallbackFolder,
  fallbackExt,
  step = 1
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Preload images
  useEffect(() => {
    setIsLoading(true);
    imagesRef.current = [];

    const loadedImages: HTMLImageElement[] = [];
    const expectedCount = Math.floor(totalFrames / step);
    let count = 0;

    for (let i = 1; i <= totalFrames; i += step) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      
      // Primary image URL
      img.src = `${folder}/frame_${numStr}.${ext}`;

      img.onload = () => {
        count++;
        if (count >= expectedCount) {
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        if (fallbackFolder && fallbackExt) {
          img.src = `${fallbackFolder}/frame_${numStr}.${fallbackExt}`;
          img.onload = () => {
            count++;
            if (count >= expectedCount) setIsLoading(false);
          };
          img.onerror = () => {
            count++;
            if (count >= expectedCount) setIsLoading(false);
          };
        } else {
          count++;
          if (count >= expectedCount) setIsLoading(false);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      imagesRef.current = [];
    };
  }, [folder, fallbackFolder, fallbackExt, totalFrames, ext, step]);

  // Canvas Draw Function with High DPI & Cover Fit
  const renderFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

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

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let renderWidth = displayWidth;
    let renderHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - renderHeight) / 2;
    } else {
      renderWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - renderWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();
  };

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || imagesRef.current.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const frameCount = imagesRef.current.length;
      const targetIndex = Math.min(
        frameCount - 1,
        Math.floor(currentProgress * frameCount)
      );

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoading]);

  // Draw initial frame once loaded
  useEffect(() => {
    if (!isLoading && imagesRef.current.length > 0) {
      renderFrame(0);
    }
  }, [isLoading]);

  return (
    <div
      id={id}
      ref={containerRef}
      className="relative w-full bg-[#0F0E0D]"
      style={{ height: '220vh' }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Full-Bleed 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Soft Vignette Edge Fades for Seamless Section Blending */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0F0E0D] to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F0E0D] to-transparent z-1 pointer-events-none" />

        {/* Subtle Spinner during initial load only */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-[#0F0E0D] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

      </div>
    </div>
  );
};

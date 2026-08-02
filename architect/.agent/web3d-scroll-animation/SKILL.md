---
name: web3d-scroll-animation
description: Implement scroll-linked 3D character walking animations or frame sequences in web applications. Use when the user wants to integrate a walking character sequence (e.g. from split GIF frames) that translates vertically or changes frames in sync with browser scroll depth. This skill covers setting up GSAP ScrollTrigger timelines, mapping scroll scroll-top to image frame indexes, establishing full-bleed absolute layouts, and structuring text card layouts to create open central channels that keep the character visible without text overlaps.
---

# Web3D Scroll Animation Skill

This skill guides the implementation of scroll-driven, frame-by-frame 3D character walking cycles. It integrates CSS styling, React state management, and GSAP ScrollTrigger.

## Core Implementation Steps

### 1. Asset Setup & Optimization
- Convert split animation frames from heavy PNGs to **WebP format** (preserving alpha transparency) to reduce download size by 90% (e.g., compressed WebP frames average 30-50KB each).
- Save them in the `public/` directory so they are served statically (e.g., `/walking-frames/ezgif-frame-001.webp`).
- Pre-load WebP images in a React `useEffect` hook and choose a step size (e.g., `FRAME_STEP = 2` to load only 48 of the 95 frames) to optimize network payload and initial page load speed.

### 2. GSAP ScrollTrigger Orchestration
Set up a GSAP ScrollTrigger timeline to handle both:
- **Frame Progression (Walk Cycle)**: Animate a virtual `frame` property of an object from `0` to `totalFrames` and set the state on update.
- **Vertical Position (Translation)**: Translate the character wrapper down the vertical track relative to the section scroll depth.

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Inside Component:
useEffect(() => {
  if (!loaded || images.length === 0) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // 0.5s lag for physics-based elastic glide
      invalidateOnRefresh: true,
    }
  });

  // Exactly 1 loop of the animation sequence over the scroll depth
  const totalFrames = images.length;
  const frameObj = { frame: 0 };

  tl.to(frameObj, {
    frame: totalFrames - 1,
    ease: "none",
    onUpdate: () => {
      setFrameIndex(Math.floor(frameObj.frame) % images.length);
    }
  }, 0);

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, [loaded, images]);
```

### 3. Full-Bleed Sticky Background Styling
To blend the image backgrounds seamlessly with the page:
1. Ensure the parent page background (`bg-black` or specific hex/HSL) matches the edge color of your character frames exactly.
2. Use `object-cover` and `object-top` styling to stretch the frames edge-to-edge across the viewport without cropping the head.

```jsx
<div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
  <div className="sticky top-28 left-0 w-full h-[calc(100vh-8rem)]">
    <img 
      src={images[frameIndex].src} 
      className="w-full h-full object-cover object-top opacity-100"
    />
  </div>
</div>
```

### 4. Layout Width Channels (Content Spacing)
To prevent text from overlapping or obscuring the walking character:
- Do not center text cards directly on top of the character.
- Shrink the text card columns (e.g. `w-[42%]`) and expand the empty spacers (e.g. `w-[58%]`) to leave an open channel in the center where the character walks freely.
- Ensure the header text is left-aligned (`text-left`) so it stays clear of the character's face.
- Add fade gradients (`bg-gradient-to-b` and `bg-gradient-to-t` from black to transparent) at the top and bottom of the section to smoothly transition the character's legs in/out of view.

### 5. Handling Scroll Container Overflow Limitations (Sticky vs. Fixed)
If any parent wrapper has `overflow-x: hidden` or `overflow-y: hidden` (common in modern layout frameworks to prevent horizontal scrollbars), the browser's rendering engine will disable `position: sticky` on all nested children, causing them to scroll with the page.

To bypass this limitation and achieve reliable viewport locking:
1. **Use `position: fixed`** on the visual frame container instead of `sticky`.
2. **Implement Viewport Boundary Detection** in the scroll handler to toggle visibility. This prevents the fixed element from blocking subsequent sections:
   ```javascript
   const rect = sectionRef.current.getBoundingClientRect();
   const inView = rect.bottom > 0 && rect.top < window.innerHeight;
   setIsVisible(inView);
   ```
3. **Feather the Transition Line:** Add a feathered gradient overlay at the bottom of the fixed container matching the next section's background color (e.g. `bg-gradient-to-t from-white to-transparent`). As the next section scrolls up over the viewport, its edge will merge seamlessly with the gradient instead of cutting off the frames with a hard horizontal line.


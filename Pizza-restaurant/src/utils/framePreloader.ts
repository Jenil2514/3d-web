export const TOTAL_FRAMES = 245;
export const FRAME_STEP = 2;

// Generate all frame image paths
export const FRAME_PATHS: string[] = [];
for (let i = 1; i <= TOTAL_FRAMES; i += FRAME_STEP) {
  const paddedIndex = String(i).padStart(3, '0');
  FRAME_PATHS.push(`/pizza-frames/ezgif-frame-${paddedIndex}.webp`);
}

export const TOTAL_FRAME_COUNT = FRAME_PATHS.length;

// Memory cache for HTMLImageElement instances to prevent browser garbage collection & network refetches
const imageCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAME_COUNT).fill(null);
const loadedStatus: boolean[] = new Array(TOTAL_FRAME_COUNT).fill(false);

let isPreloadStarted = false;
let isInitialBatchComplete = false;
let isAllComplete = false;

type Listener = (loadedIndex: number) => void;
const listeners = new Set<Listener>();

export const subscribeFrameLoaded = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = (index: number) => {
  listeners.forEach((listener) => listener(index));
};

/**
 * Returns pre-cached HTMLImageElement for frame index if loaded, null otherwise.
 */
export const getCachedImage = (index: number): HTMLImageElement | null => {
  if (index < 0 || index >= TOTAL_FRAME_COUNT) return null;
  return loadedStatus[index] ? imageCache[index] : null;
};

/**
 * Fallback to find nearest loaded image if target frame is still loading.
 */
export const getNearestCachedImage = (index: number): HTMLImageElement | null => {
  if (loadedStatus[index] && imageCache[index]) {
    return imageCache[index];
  }
  // Search outward for nearest loaded frame
  for (let offset = 1; offset < TOTAL_FRAME_COUNT; offset++) {
    const prev = index - offset;
    const next = index + offset;
    if (prev >= 0 && loadedStatus[prev] && imageCache[prev]) {
      return imageCache[prev];
    }
    if (next < TOTAL_FRAME_COUNT && loadedStatus[next] && imageCache[next]) {
      return imageCache[next];
    }
  }
  return null;
};

/**
 * Start 2-stage frame loading:
 * Stage 1: Load first few initial frames (e.g. 5) immediately.
 * Stage 2: Progressively load all remaining frames in background batches.
 */
export const initFramePreloader = () => {
  if (isPreloadStarted) return;
  isPreloadStarted = true;

  const INITIAL_BATCH_SIZE = 5;

  const loadSingleImage = (i: number): Promise<void> => {
    return new Promise((resolve) => {
      if (loadedStatus[i] && imageCache[i]) {
        resolve();
        return;
      }
      const img = new Image();
      img.src = FRAME_PATHS[i];
      img.onload = () => {
        imageCache[i] = img;
        loadedStatus[i] = true;
        notifyListeners(i);
        resolve();
      };
      img.onerror = () => {
        // Retry once on error or resolve silently
        resolve();
      };
    });
  };

  // Stage 1: Load initial frames first
  const initialPromises: Promise<void>[] = [];
  for (let i = 0; i < Math.min(INITIAL_BATCH_SIZE, TOTAL_FRAME_COUNT); i++) {
    initialPromises.push(loadSingleImage(i));
  }

  Promise.all(initialPromises).then(() => {
    isInitialBatchComplete = true;

    // Stage 2: Progressively load remaining frames in background
    let currentIndex = INITIAL_BATCH_SIZE;

    const loadNextBatch = () => {
      if (currentIndex >= TOTAL_FRAME_COUNT) {
        isAllComplete = true;
        return;
      }
      const batchSize = 8;
      const batchPromises: Promise<void>[] = [];
      const end = Math.min(currentIndex + batchSize, TOTAL_FRAME_COUNT);

      for (let i = currentIndex; i < end; i++) {
        batchPromises.push(loadSingleImage(i));
      }

      currentIndex = end;

      Promise.all(batchPromises).then(() => {
        if (currentIndex < TOTAL_FRAME_COUNT) {
          setTimeout(loadNextBatch, 50);
        } else {
          isAllComplete = true;
        }
      });
    };

    loadNextBatch();
  });
};

export const getPreloadState = () => ({
  isInitialBatchComplete,
  isAllComplete
});

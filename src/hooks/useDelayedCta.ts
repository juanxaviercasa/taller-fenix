import { useEffect, useState } from 'react';

/** Storage is read only after mount, keeping server and hydration renders identical. */
export function useDelayedCta(video: HTMLVideoElement | null, pitchSeconds: number, storageKey: string) {
  const [isMounted, setIsMounted] = useState(false);
  const [showCta, setShowCta] = useState(false);
  useEffect(() => {
    // Required mount gate: synchronize browser storage after SSR hydration.
    // oxlint-disable-next-line react/set-state-in-effect
    setIsMounted(true);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let unlocked = false;
    const validStamp = (value: string | null) => {
      const stamp = Number(value);
      return value !== null && Number.isFinite(stamp) && stamp > 0 && stamp <= Date.now();
    };
    const reveal = () => {
      unlocked = true;
      setShowCta(true);
      try { window.localStorage.setItem(storageKey, String(Date.now())); } catch { /* Storage disabled: preserve in memory. */ }
    };
    try {
      if (validStamp(window.localStorage.getItem(storageKey))) { unlocked = true; setShowCta(true); }
    } catch { /* Playback still works in private mode. */ }
    const clearTimer = () => { if (timer !== undefined) clearTimeout(timer); };
    const sync = () => {
      clearTimer();
      if (!video || unlocked) return;
      if (video.currentTime >= pitchSeconds) { reveal(); return; }
      if (!video.paused && !video.seeking && video.readyState >= 3 && video.playbackRate > 0) {
        timer = setTimeout(sync, Math.min(1000, Math.max(50, (pitchSeconds - video.currentTime) / video.playbackRate * 1000)));
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey && validStamp(event.newValue)) { unlocked = true; clearTimer(); setShowCta(true); }
    };
    const events = ['timeupdate', 'playing', 'pause', 'seeking', 'seeked', 'ratechange', 'waiting', 'ended'] as const;
    events.forEach(event => video?.addEventListener(event, sync));
    window.addEventListener('storage', onStorage);
    sync();
    return () => {
      clearTimer();
      events.forEach(event => video?.removeEventListener(event, sync));
      window.removeEventListener('storage', onStorage);
    };
  }, [video, pitchSeconds, storageKey]);
  return { isMounted, showCta: isMounted && showCta };
}

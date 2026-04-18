import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function HlsVideo({ src, className, saturated = true, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
        maxMaxBufferLength: 30,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Im lặng bỏ qua lỗi tiết kiệm pin (AbortError) hoặc Auto-play policy bị chặn
          });
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari support
      video.src = src;
      const playVideo = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      };
      video.addEventListener('loadedmetadata', playVideo);
      
      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
      };
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={cn(
        "object-cover",
        !saturated && "saturate-0",
        className
      )}
      {...props}
    />
  );
}

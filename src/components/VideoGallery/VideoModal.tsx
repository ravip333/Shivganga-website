import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { VideoItem } from '../../types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };

    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              {video.category || 'Walkthrough Video'}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white truncate max-w-lg">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Info footer */}
        <div className="p-4 sm:p-5 bg-slate-900/90 text-slate-300">
          <p className="text-sm leading-relaxed text-slate-300">
            {video.caption || video.description}
          </p>
          {video.duration && (
            <p className="mt-2 text-xs text-slate-400">
              Duration: <span className="text-emerald-400 font-medium">{video.duration}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

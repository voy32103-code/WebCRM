import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[110] flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <video 
                src={videoUrl || "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"} 
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

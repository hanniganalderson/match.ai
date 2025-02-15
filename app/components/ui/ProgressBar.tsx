'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="fixed top-0 left-0 right-0 h-1 bg-black/50">
    <motion.div 
      className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
      style={{ 
        scaleX: progress,
        transformOrigin: 'left'
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 bg-accent-blue/20 blur-sm" />
  </div>
);
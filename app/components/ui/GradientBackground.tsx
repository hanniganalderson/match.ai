'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const createDots = () => Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  x: (i % 5) * 20 + 10,
  y: Math.floor(i / 5) * 20 + 10,
  duration: 2 + (i % 3),
  delay: i * 0.1
}));

export const GradientBackground = () => {
  const [dots, setDots] = useState(createDots());

  useEffect(() => {
    setDots(dots.map(dot => ({
      ...dot,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2
    })));
  }, []);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        {/* Base gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-background to-accent-purple/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/10 via-transparent to-transparent" />
        
        {/* Animated dots */}
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 bg-accent-blue/30 rounded-full"
            style={{ top: `${dot.y}%`, left: `${dot.x}%` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
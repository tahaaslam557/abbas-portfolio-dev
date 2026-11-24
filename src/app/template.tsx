"use client";

import { MotionConfig, motion } from "motion/react";

/**
 * Short, non-blocking page entrance. Content is interactive immediately.
 * The wipe is always rendered (so server and client markup match) and is
 * simply hidden by CSS for reduced-motion users.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": Motion drops transform/layout animation for reduced-motion users
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-top border-b-2 border-accent bg-night motion-reduce:hidden"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.12 }}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}

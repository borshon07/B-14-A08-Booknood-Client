"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Icon3DProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
};

// icon with a 3D tilt on hover and a soft shadow that "lifts" with it
export default function Icon3D({ icon: Icon, size = 20, className = "" }: Icon3DProps) {
  return (
    <motion.span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ perspective: 400, transformStyle: "preserve-3d" }}
      whileHover={{
        rotateY: 25,
        rotateX: -15,
        scale: 1.25,
        y: -2,
        filter: "drop-shadow(3px 6px 4px rgba(0,0,0,0.35))",
      }}
      whileTap={{ scale: 0.9, rotateY: 0, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Icon size={size} strokeWidth={2.2} />
    </motion.span>
  );
}
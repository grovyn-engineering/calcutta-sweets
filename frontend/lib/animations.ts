import { motion } from "framer-motion";

export const fadeUp = {
  initial: { y: 20 },
  whileInView: {
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  viewport: { once: true, amount: 0.08, margin: "0px 0px 120px 0px" },
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true, amount: 0.06, margin: "0px 0px 160px 0px" },
};

export const hoverScale = {
  scale: 1.03,
  transition: {
    duration: 0.4,
    ease: "easeOut" as const
  }
};

export const hoverLift = {
  y: -4,
  transition: {
    duration: 0.3,
    ease: "easeOut" as const
  }
};

export const imageReveal = {
  initial: { scale: 1.1, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  }
};


"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_KEY = "intro-splash-shown";
const TEXT = "Calcutta Sweets";
const HIDE_AFTER_MS = 3600;
const UNMOUNT_AFTER_MS = HIDE_AFTER_MS + 1600;
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const letters = useMemo(() => TEXT.split(""), []);

  useEffect(() => {
    const hasShown = sessionStorage.getItem(SPLASH_KEY);
    if (hasShown) return;

    sessionStorage.setItem(SPLASH_KEY, "true");

    setShouldRender(true);
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, HIDE_AFTER_MS);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, UNMOUNT_AFTER_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, #F8F3ED 0%, #F5EDE6 45%, #ECE0D3 100%)",
          }}
        >
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,0.18)_100%)] pointer-events-none" />

          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: GRAIN_BG }}
          />

          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-[2px] h-[2px] bg-[#C6A46C] rounded-full opacity-30 will-change-transform"
                style={{ left: `${15 + i * 20}%` }}
                initial={{ y: "110%" }}
                animate={{
                  y: "-10%",
                  transition: {
                    duration: 10 + i,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.6,
                  },
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center text-center w-full px-8 sm:px-12">

            <motion.div
              initial={{ x: "-150%", opacity: 0 }}
              animate={{
                x: "150%",
                opacity: [0, 0.6, 0],
                transition: {
                  duration: 2.8,
                  ease: "easeInOut",
                  delay: 0.8,
                },
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B97B]/40 to-transparent blur-3xl will-change-transform"
            />

            <h1
              className="font-dm-serif tracking-[0.14em] whitespace-nowrap leading-none"
              style={{
                fontSize: "clamp(1.5rem, 8.5vw, 9rem)",
              }}
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.045,
                    duration: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block will-change-transform"
                  style={{
                    color: "#3E2F26",
                    textShadow: "0 2px 20px rgba(62,47,38,0.08)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 1.4 }}
              className="h-[1px] w-[68%] mt-10 md:mt-14 bg-gradient-to-r from-transparent via-[#9B6E2C] to-transparent origin-center"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-5 text-[10px] tracking-[0.5em] uppercase text-[#7A5C3E]"
            >
              Handcrafted Luxury Sweets
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
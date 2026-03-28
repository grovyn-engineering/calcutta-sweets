"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = "Calcutta Sweets";

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem("intro-splash-shown");

    if (!hasBeenShown) {
      setShouldRender(true);
      setIsVisible(true);

      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("intro-splash-shown", "true");
        document.body.style.overflow = "unset";
      }, 3600);

      // remove after animation completes
      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 5200);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
        document.body.style.overflow = "unset";
      };
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%", // slide up
            scale: 1.02,
            filter: "blur(8px)",
            transition: {
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1], // cinematic ease
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

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-[2px] h-[2px] bg-[#C6A46C] rounded-full opacity-30"
                style={{ left: `${10 + i * 10}%` }}
                initial={{ y: "110%" }}
                animate={{
                  y: "-10%",
                  transition: {
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.4,
                  },
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center">

            {/* Light sweep */}
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
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B97B]/40 to-transparent blur-3xl"
            />

            {/* TEXT */}
            <h1 className="font-dm-serif text-[2.8rem] sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] text-center flex">
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.96,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 0.5 + i * 0.045,
                    duration: 1.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 0.7,
                transition: {
                  delay: 1.3,
                  duration: 1.6,
                  ease: "circOut",
                },
              }}
              className="h-[1px] w-[68%] mt-10 md:mt-14 bg-gradient-to-r from-transparent via-[#9B6E2C] to-transparent origin-center"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 0.5,
                y: 0,
                transition: { delay: 1.8, duration: 1 },
              }}
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
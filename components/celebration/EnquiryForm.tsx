"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { CheckCircle2, Snowflake, Leaf } from "lucide-react";

export default function EnquiryForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent default form submission for the demo
    alert("Thank you for your enquiry. We will get back to you shortly.");
  };

  return (
    <section className="w-full py-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#3E2B1E] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side: Context & Trust Badges */}
        <motion.div 
          {...fadeUp}
          className="flex flex-col gap-8"
        >
          <div>
            <h2 className="font-dm-serif text-4xl sm:text-5xl md:text-6xl text-[#FDFBF7] leading-tight mb-6">
              Let&apos;s Design Your
              <br />
              Sweet Moment
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#D9D1C5] leading-relaxed max-w-md">
              Join over 5,000 satisfied hosts who trusted us for their grand occasions. We respond to all enquiries within 2 business hours.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46]" />
              <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80">FSSAI Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <Snowflake className="w-4 h-4 text-[#A67C46]" />
              <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80">Temp Controlled</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <Leaf className="w-4 h-4 text-[#A67C46]" />
              <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80">100% Egg Free</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form Card */}
        <motion.div 
          {...fadeUp}
          transition={{ ...fadeUp.whileInView.transition, delay: 0.2 }}
          className="bg-[#FAF5F0] rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl"
        >
          <h3 className="font-dm-serif text-2xl text-[#3E2B1E] mb-8">Enquiry Form</h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A67C46]">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="Arjun Das" 
                  required
                  className="bg-transparent border-b border-[#D9D1C5] pb-2 text-sm text-[#3E2B1E] placeholder:text-[#3E2B1E]/40 focus:outline-none focus:border-[#A67C46] transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A67C46]">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+91 12345 67890" 
                  required
                  className="bg-transparent border-b border-[#D9D1C5] pb-2 text-sm text-[#3E2B1E] placeholder:text-[#3E2B1E]/40 focus:outline-none focus:border-[#A67C46] transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A67C46]">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                placeholder="arjun@example.com" 
                required
                className="bg-transparent border-b border-[#D9D1C5] pb-2 text-sm text-[#3E2B1E] placeholder:text-[#3E2B1E]/40 focus:outline-none focus:border-[#A67C46] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Date */}
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A67C46]">
                  Event Date
                </label>
                <input 
                  type="date" 
                  id="date" 
                  required
                  className="bg-transparent border-b border-[#D9D1C5] pb-2 text-sm text-[#3E2B1E] focus:outline-none focus:border-[#A67C46] transition-colors"
                />
              </div>

              {/* Occasion */}
              <div className="flex flex-col gap-2">
                <label htmlFor="occasion" className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A67C46]">
                  Occasion
                </label>
                <select 
                  id="occasion" 
                  required
                  className="bg-transparent border-b border-[#D9D1C5] pb-2 text-sm text-[#3E2B1E] focus:outline-none focus:border-[#A67C46] transition-colors appearance-none cursor-pointer"
                >
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="festival">Festival</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A67C46]">
                Message
              </label>
              <textarea 
                id="message" 
                rows={3}
                placeholder="Tell us about your requirements..." 
                className="bg-transparent border-b border-[#D9D1C5] pb-2 text-sm text-[#3E2B1E] placeholder:text-[#3E2B1E]/40 focus:outline-none focus:border-[#A67C46] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="mt-4 w-full py-4 rounded-full bg-[#8F6A3B] hover:bg-[#A67C46] text-white font-sans text-sm font-semibold transition-colors shadow-md"
            >
              Request a Call Back
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

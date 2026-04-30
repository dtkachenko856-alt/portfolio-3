"use client";

import { motion } from "framer-motion";
import { mocData } from "@/mocData";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, ChevronRight } from "lucide-react";

export default function WorkHistory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { workHistory } = mocData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section id="experience" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
            Career Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A journey through impactful roles and transformative projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Animated Timeline Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originY: 0 }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {workHistory.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Animated Timeline Node */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full glass flex items-center justify-center z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2, type: "spring" as const, stiffness: 200 }}
                  whileHover={{ scale: 1.3, boxShadow: "0 0 20px rgba(99,102,241,0.5)" }}
                >
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-indigo-500"
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(99,102,241,0.5)", "0 0 10px rgba(99,102,241,0.8)", "0 0 0px rgba(99,102,241,0.5)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <motion.div 
                    className="glass-card p-6 relative overflow-hidden group cursor-pointer"
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      transition: { type: "spring" as const, stiffness: 200, damping: 15 }
                    }}
                  >
                    {/* Animated gradient background */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 100%)",
                      }}
                    />
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="p-2 rounded-lg bg-indigo-500/10 text-2xl"
                          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {job.icon}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-indigo-300 transition-colors">{job.company}</h3>
                          <p className="text-sm text-indigo-400">{job.title}</p>
                        </div>
                      </div>
                      <motion.span 
                        className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-white/5"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.2)" }}
                      >
                        {job.year}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10">
                      {job.description}
                    </p>

                    {/* Highlights with stagger */}
                    <ul className="space-y-2 relative z-10">
                      {job.highlights.map((highlight, hIndex) => (
                        <motion.li 
                          key={hIndex} 
                          className="flex items-start gap-2 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3 + hIndex * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                          </motion.div>
                          <span className="text-muted-foreground hover:text-foreground transition-colors">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Glow border */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl border border-transparent pointer-events-none"
                      whileHover={{ 
                        borderColor: "rgba(99,102,241,0.3)",
                        boxShadow: "0 0 30px rgba(99,102,241,0.15)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

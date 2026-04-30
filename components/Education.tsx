"use client";

import { motion } from "framer-motion";
import { mocData } from "@/mocData";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { education } = mocData;

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
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateY: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section id="education" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Formal education that laid the foundation for my engineering career.
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { type: "spring" as const, stiffness: 200, damping: 15 }
              }}
              className="glass-card p-6 relative overflow-hidden group cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(236,72,153,0.05) 100%)",
                }}
              />
              
              {/* Icon & Year Badge */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <motion.div 
                  className="p-3 rounded-xl bg-indigo-500/10 text-3xl"
                  whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {edu.icon}
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-white/5"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.2)" }}
                >
                  <Calendar className="w-3 h-3" />
                  {edu.year}
                </motion.div>
              </div>

              {/* Degree */}
              <h3 className="font-semibold text-lg mb-2 leading-tight group-hover:text-indigo-300 transition-colors relative z-10">
                {edu.degree}
              </h3>

              {/* School */}
              <motion.div 
                className="flex items-center gap-1.5 text-muted-foreground text-sm relative z-10"
                whileHover={{ x: 5 }}
              >
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                {edu.school}
              </motion.div>
              
              {/* Glow border effect */}
              <motion.div 
                className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
                whileHover={{ 
                  borderColor: "rgba(99,102,241,0.4)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.2), inset 0 0 40px rgba(99,102,241,0.05)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Element with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <motion.div 
            className="flex items-center gap-4"
            animate={{ gap: [16, 20, 16] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
            <motion.div 
              className="p-2 rounded-full bg-indigo-500/10"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              animate={{ 
                boxShadow: ["0 0 0px rgba(99,102,241,0.3)", "0 0 20px rgba(99,102,241,0.5)", "0 0 0px rgba(99,102,241,0.3)"]
              }}
            >
              <GraduationCap className="w-5 h-5 text-indigo-400" />
            </motion.div>
            <motion.div 
              className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

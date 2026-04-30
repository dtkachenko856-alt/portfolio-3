"use client";

import { motion } from "framer-motion";
import { mocData } from "@/mocData";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { about, theme } = mocData;

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div 
            variants={itemVariants} 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated Glow Effect */}
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Image Container with hover zoom */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden border border-border/50"
                whileHover={{ borderColor: "rgba(99,102,241,0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={theme.aboutImage}
                  alt="Work Environment"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </motion.div>
              
              {/* Floating Card with enhanced animation */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="absolute -bottom-6 -right-6 glass-card p-4 max-w-[200px] cursor-pointer"
              >
                <motion.div 
                  className="text-2xl font-bold text-gradient mb-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, type: "spring" as const }}
                >
                  8+
                </motion.div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <motion.span
                variants={itemVariants}
                className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block"
              >
                About Me
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Building Digital Products
                <span className="text-gradient"> That Scale</span>
              </motion.h2>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              {about.bio1}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              {about.bio2}
            </motion.p>

            {/* Strengths with stagger and hover */}
            <motion.div variants={itemVariants} className="space-y-3 pt-4">
              {about.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ 
                    delay: 0.5 + index * 0.15, 
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 12,
                  }}
                  whileHover={{ 
                    x: 10, 
                    scale: 1.02,
                    transition: { type: "spring" as const, stiffness: 300 }
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <motion.div 
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Check className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                  <span className="text-foreground group-hover:text-indigo-300 transition-colors">{strength}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

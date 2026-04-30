"use client";

import { motion } from "framer-motion";
import { mocData } from "@/mocData";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Wrench } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  "Tools and Platform": <Wrench className="w-5 h-5" />,
};

const levelWidths: Record<string, string> = {
  Expert: "w-[95%]",
  Advanced: "w-[80%]",
  Intermediate: "w-[60%]",
  Beginner: "w-[40%]",
};

const levelColors: Record<string, string> = {
  Expert: "from-indigo-500 to-purple-500",
  Advanced: "from-purple-500 to-pink-500",
  Intermediate: "from-pink-500 to-rose-500",
  Beginner: "from-rose-500 to-orange-500",
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = mocData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through years of building production-grade applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { type: "spring" as const, stiffness: 200, damping: 15 }
              }}
              className="glass-card p-6 relative overflow-hidden group cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Animated gradient border on hover */}
              <motion.div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 50%, rgba(236,72,153,0.2) 100%)",
                }}
              />
              
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div 
                  className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {categoryIcons[category.category]}
                </motion.div>
                <h3 className="font-semibold text-lg">{category.category}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4 relative z-10">
                {category.items.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name} 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.08,
                      type: "spring" as const,
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-4 h-4 text-indigo-400"
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          dangerouslySetInnerHTML={{ __html: skill.icon }}
                        />
                        <span className="text-sm font-medium group-hover:text-indigo-300 transition-colors">{skill.name}</span>
                      </div>
                      <motion.span 
                        className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-white/5"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.2)" }}
                      >
                        {skill.level}
                      </motion.span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0, scaleX: 0 }}
                        animate={isInView ? { width: "100%", scaleX: 1 } : {}}
                        transition={{
                          delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        whileHover={{ 
                          filter: "brightness(1.3)",
                          boxShadow: "0 0 20px rgba(99,102,241,0.5)",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${levelColors[skill.level]} ${levelWidths[skill.level]}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-1 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

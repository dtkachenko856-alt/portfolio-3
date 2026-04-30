"use client";

import { motion } from "framer-motion";
import { mocData } from "@/mocData";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

const FEATURED_COUNT = 6;

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const { projects, projectHistory } = mocData;

  const displayedProjects = showAll ? projects : projects.slice(0, FEATURED_COUNT);

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
    hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {projectHistory.subtitle}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { type: "spring" as const, stiffness: 200, damping: 15 }
              }}
              className="group glass-card overflow-hidden relative cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 50%, rgba(236,72,153,0.1) 100%)",
                }}
              />
              
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
                
                {/* Hover Overlay with slide-up effect */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-indigo-500/40 via-purple-500/20 to-transparent flex items-end justify-center pb-6 gap-4"
                >
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" as const }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" as const }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors shadow-lg"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5 relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <motion.h3 
                    className="font-semibold text-lg group-hover:text-indigo-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
                  </motion.div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-foreground/70 transition-colors">
                  {project.description}
                </p>

                {/* Technologies with stagger */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 + techIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "rgba(99,102,241,0.3)",
                        borderColor: "rgba(99,102,241,0.5)",
                      }}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Glow border effect */}
              <motion.div 
                className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
                whileHover={{ 
                  borderColor: "rgba(99,102,241,0.3)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.2), inset 0 0 40px rgba(99,102,241,0.05)"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* See More Button */}
        {projects.length > FEATURED_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-sm font-medium text-muted-foreground hover:text-foreground hover:border-indigo-500/30 transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  {projectHistory.buttonLabel} <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

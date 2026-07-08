"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Github, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

// Allowed domains for demo URLs
const ALLOWED_DOMAINS = ['github.io', 'vercel.app', 'netlify.app', 'pages.dev'];

// Validate if URL is safe to load in iframe
function isSafeUrl(url) {
  if (!url) return true; // Default to local preview
  try {
    const parsed = new URL(url);
    // Only allow same-origin and trusted domains
    return ALLOWED_DOMAINS.some(domain => 
      parsed.hostname === domain || parsed.hostname.endsWith('.' + domain)
    );
  } catch {
    return true; // If URL parsing fails, use local preview
  }
}

// Get safe iframe source
function getSafeDemoUrl(demoUrl, slug) {
  if (demoUrl && isSafeUrl(demoUrl)) {
    return demoUrl;
  }
  return `/live/${slug}/index.html`;
}

const ProjectCard = memo(function ProjectCard({ project, index = 0 }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const savedFavorites = JSON.parse(localStorage.getItem("buildverse_favorites") || "[]");
    setIsFavorite(savedFavorites.includes(project.slug));
  }, [project.slug]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const savedFavorites = JSON.parse(localStorage.getItem("buildverse_favorites") || "[]");
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = savedFavorites.filter((slug) => slug !== project.slug);
    } else {
      newFavorites = [...savedFavorites, project.slug];
    }
    
    localStorage.setItem("buildverse_favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)" }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className={`glass-panel ${styles.card}`}
      style={{
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Live Preview Section */}
      <div 
        onClick={() => window.open(project.demoUrl || `/live/${project.slug}/index.html`, '_blank')}
        style={{ 
          height: '220px', 
          width: '100%', 
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.5)'
        }}
      >
        <iframe 
          src={getSafeDemoUrl(project.demoUrl, project.slug)}
          tabIndex="-1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '400%',
            height: '400%',
            transform: 'scale(0.25)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
            border: 'none',
            background: '#fff'
          }}
          title={`${project.title} Preview`}
        />

        <button 
          className={styles.favoriteBtn}
          onClick={toggleFavorite}
          style={{ color: isFavorite ? "var(--primary)" : "inherit" }}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Card Content */}
      <div className={styles.cardBody}>
        <div style={{ cursor: 'pointer' }} onClick={() => window.open(project.demoUrl || `/live/${project.slug}/index.html`, '_blank')}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
        </div>
        
        <div className={styles.tags}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span className={styles.tag}>+{project.tags.length - 3}</span>
          )}
        </div>
        
        <p className={styles.authorLine}>
          by <a href={`https://github.com/${project.author.github}`} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: 'var(--text-main)', textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>@{project.author.github}</a>
        </p>

        <div className={styles.cardFooter}>
          <a href={getSafeDemoUrl(project.demoUrl, project.slug)} target="_blank" rel="noopener noreferrer" className={styles.openBtn}>
            Open
          </a>
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;

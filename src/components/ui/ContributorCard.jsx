"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import styles from "./ContributorCard.module.css";

export default function ContributorCard({ contributor, index }) {
  return (
    <motion.a
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={styles.card}
    >
      <div className={styles.avatarContainer}>
        <div className={styles.ring}></div>
        <img src={contributor.avatar_url} alt={contributor.login} className={styles.avatar} />
        <div className={styles.scoreBadge} title="Total Projects">
          {contributor.projects}
        </div>
      </div>
      
      <h3 className={styles.login}>{contributor.login}</h3>
      <div className={styles.githubLabel}>
        <FaGithub size={14} /> GitHub
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statBlock}>
          <span className={styles.statValue}>{contributor.commits}</span>
          <span className={styles.statLabel}>Commits</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statValue}>{contributor.projects}</span>
          <span className={styles.statLabel}>Projects</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statValue}>{contributor.prs || 0}</span>
          <span className={styles.statLabel}>PRs</span>
        </div>
      </div>
    </motion.a>
  );
}

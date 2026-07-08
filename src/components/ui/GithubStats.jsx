"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Users, Code2, GitCommit } from "lucide-react";
import CountUp from "react-countup";
import componentStyles from "./GithubStats.module.css";

export default function GithubStats({ styles }) {
  const [stats, setStats] = useState({
    projects: 0,
    contributors: 0,
    contributions: 0,
    pullRequests: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        // Fetch Contributors & Total Contributions
        const contribRes = await fetch("https://api.github.com/repos/MistryVishwa/BuildVerse/contributors");
        let contributorsCount = 0;
        let totalContributions = 0;
        
        if (contribRes.ok) {
          const contributors = await contribRes.json();
          contributorsCount = contributors.length;
          totalContributions = contributors.reduce((acc, curr) => acc + (curr.contributions || 0), 0);
        }

        // Fetch Total Pull Requests
        const prRes = await fetch("https://api.github.com/search/issues?q=repo:MistryVishwa/BuildVerse+is:pr");
        let pullRequestsCount = 0;
        if (prRes.ok) {
          const prData = await prRes.json();
          pullRequestsCount = prData.total_count;
        }

        // Fetch Projects Folder Count
        const projectsRes = await fetch("https://api.github.com/repos/MistryVishwa/BuildVerse/contents/projects");
        let projectsCount = 0;
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          projectsCount = Array.isArray(projectsData) 
            ? projectsData.filter(file => file.type === 'dir').length 
            : 0;
        }

        setStats(prev => ({
          ...prev,
          projects: projectsCount,
          contributors: contributorsCount,
          contributions: totalContributions,
          pullRequests: pullRequestsCount,
          loading: false
        }));

      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGithubStats();
  }, []);

  const statItems = [
    { icon: FolderGit2, label: "Total Projects", value: stats.projects, id: 'projects' },
    { icon: Users, label: "Active Contributors", value: stats.contributors, id: 'contributors' },
    { icon: GitCommit, label: "Total Contributions", value: stats.contributions, id: 'contributions' },
    { icon: Code2, label: "Total Pull Requests", value: stats.pullRequests, id: 'pullrequests' }
  ];

  return (
    <section 
      aria-label="GitHub Statistics Dashboard"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%' }}
    >
      {statItems.map((stat, i) => (
        <motion.article
          key={stat.id}
          id={`stat-${stat.id}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className={`glass-panel ${componentStyles.card}`}
          role="figure"
          aria-label={`${stat.label}: ${stats.loading ? 'Loading' : stat.value}`}
          tabIndex={0}
        >
          <div 
            style={{ 
              padding: '1rem', 
              borderRadius: '50%', 
              background: 'rgba(168, 85, 247, 0.1)', 
              color: '#a855f7',
              marginBottom: '0.5rem'
            }}
            aria-hidden="true"
          >
            <stat.icon size={28} />
          </div>
          <h3 
            className="heading-2" 
            style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}
            aria-live="polite"
          >
            {stats.loading ? (
              <span style={{ opacity: 0.5 }} aria-label="Loading">...</span>
            ) : (
              <CountUp 
                end={stat.value} 
                duration={2.5} 
                separator="," 
                suffix={stat.value > 0 && stat.label !== "Total Pull Requests" ? "+" : ""} 
              />
            )}
          </h3>
          <p 
            className="text-muted" 
            style={{ margin: 0, fontWeight: '500', fontSize: '0.95rem', letterSpacing: '0.5px' }}
          >
            {stat.label}
          </p>
        </motion.article>
      ))}
    </section>
  );
}

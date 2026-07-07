"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, GitFork, Download, GitBranch, 
  MessageSquare, Code, CheckCircle, GitCommit, 
  Upload, GitPullRequest 
} from "lucide-react";
import styles from "./ContributeSection.module.css";

const steps = [
  {
    icon: GitFork,
    title: "1. Fork the Repository",
    desc: "Create a personal copy of the BuildVerse repository on your own GitHub account."
  },
  {
    icon: Download,
    title: "2. Clone the Repository",
    desc: "Download your forked repository to your local machine to start making changes."
  },
  {
    icon: GitBranch,
    title: "3. Create a New Branch",
    desc: "Create a separate branch for your feature or project to keep things organized."
  },
  {
    icon: MessageSquare,
    title: "4. Choose or Create an Issue",
    desc: "Find an existing issue to work on, or open a new one to propose your project."
  },
  {
    icon: Code,
    title: "5. Implement Your Changes",
    desc: "Add your code, ensuring it follows the community guidelines and standard structure."
  },
  {
    icon: CheckCircle,
    title: "6. Test Your Changes",
    desc: "Run the project locally to verify that everything works flawlessly without errors."
  },
  {
    icon: GitCommit,
    title: "7. Commit with a Meaningful Message",
    desc: "Write a clear, descriptive commit message explaining the changes you made."
  },
  {
    icon: Upload,
    title: "8. Push Your Branch",
    desc: "Upload your local branch back up to your forked repository on GitHub."
  },
  {
    icon: GitPullRequest,
    title: "9. Create a Pull Request",
    desc: "Submit a PR to the main BuildVerse repository to request your changes be merged."
  }
];

export default function ContributeSection() {
  return (
    <section id="contribute" className={styles.section}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Contribution Guide</h2>
        </motion.div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={styles.card}
            >
              <div className={styles.glow} />
              
              <div className={styles.iconWrapper}>
                <step.icon size={28} />
              </div>
              
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.footer}
        >
          <p className={styles.ctaText}>
            Contribute in Steps — Read the full guide in <span className={styles.codeBadge}>CONTRIBUTING.md</span>.
          </p>
          <a 
            href="https://github.com/MistryVishwa/BuildVerse?tab=contributing-ov-file" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.ctaButton}
          >
            Read Contributing Guide <ArrowRight size={20} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

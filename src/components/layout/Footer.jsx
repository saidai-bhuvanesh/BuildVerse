import Link from "next/link";
import { Heart } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          <div className={styles.brandInfo}>
            <Link href="/" className={styles.brand}>
              <img src="/logo.png" alt="BuildVerse Logo" style={{ width: 28, height: 28, borderRadius: 6 }} />
              <span className={styles.brandText}>BuildVerse</span>
            </Link>
            <p className={styles.description} style={{ marginTop: '1rem', maxWidth: '300px' }}>
              BuildVerse is the ultimate open-source ecosystem for developers to submit, discover, and collaborate on real-world projects.
            </p>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Platform</h4>
            <Link href="/projects">Showcase</Link>
            <Link href="/contributors">Contributors</Link>
            <a href="https://github.com/MistryVishwa/BuildVerse/issues" target="_blank" rel="noreferrer">Add Project</a>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Community</h4>
            <Link href="/#about">About Us</Link>
            <Link href="/faq">FAQ</Link>
            <a href="https://github.com/MistryVishwa/BuildVerse" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} BuildVerse. Built by MistryVishwa
          </p>
          <div className={styles.socialLinks}>
            <a href="https://github.com/MistryVishwa/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vishwa-mistry/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.instagram.com/_mistry_vishwa_/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
